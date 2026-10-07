import { EnvConfigService } from "@infrastructure/config/env-config.service"
import { NodeEnv } from "@infrastructure/config/env.types"
import { InfrastructureModule } from "@infrastructure/infrastructure.module"
import { Module } from "@nestjs/common"
import { ThrottlerModule } from "@nestjs/throttler"
import { GraphqlPresentationModule } from "@presentation/graphql/graphql.module"
import { HealthHttpModule } from "@presentation/http/modules/health/health.module"
import { ProfileHttpModule } from "@presentation/http/modules/profile/profile.module"

@Module({
  imports: [
    InfrastructureModule,
    ThrottlerModule.forRootAsync({
      imports: [InfrastructureModule],
      inject: [EnvConfigService],
      useFactory: (env: EnvConfigService) => ({
        skipIf: () => env.nodeEnv === NodeEnv.Test,
        throttlers: [
          {
            name: "default",
            ttl: env.throttleTtlMs,
            limit: env.throttleLimit,
          },
        ],
      }),
    }),
    ProfileHttpModule,
    HealthHttpModule,
    GraphqlPresentationModule,
  ],
})
export class AppModule {}
