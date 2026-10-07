import { EnvConfigService } from "@infrastructure/config/env-config.service"
import { EnvProfileService } from "@infrastructure/config/env-profile.service"
import { validateEnv } from "@infrastructure/config/validate-env"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validate: validateEnv,
    }),
  ],
  providers: [EnvConfigService, EnvProfileService],
  exports: [EnvConfigService, EnvProfileService],
})
export class EnvConfigModule {}
