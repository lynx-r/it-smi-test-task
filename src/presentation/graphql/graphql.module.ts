import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"
import { EnvConfigModule } from "@infrastructure/config/env-config.module"
import { EnvConfigService } from "@infrastructure/config/env-config.service"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { ProfileGraphqlModule } from "@presentation/graphql/modules/profile/profile.module"
import type { ErrorResponseBody } from "@presentation/http/common/filters/core-exception.type"
import type { Request, Response } from "express"
import type { GraphQLFormattedError } from "graphql"

@Module({
  imports: [
    ProfileGraphqlModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      // TODO: Use schema first
      useFactory: (env: EnvConfigService): ApolloDriverConfig => ({
        autoSchemaFile: "schema.gql",
        sortSchema: true,
        plugins: graphQlPlugins(env),
        introspection: env.isProduction,
        context: ({ req, res }: { req: Request; res: Response }) => ({
          req,
          res,
        }),
        formatError: (formattedError: GraphQLFormattedError) => {
          const originalError = formattedError.extensions?.originalError as
            | ErrorResponseBody
            | undefined

          if (!originalError) {
            return formattedError
          }
          return {
            ...formattedError,
            message: originalError.message,
            extensions: originalError,
          }
        },
      }),
    }),
  ],
})
export class GraphqlPresentationModule {}

const graphQlPlugins = (env: EnvConfigService) => {
  if (env.isProduction) {
    return [ApolloServerPluginLandingPageLocalDefault()]
  }
  return []
}
