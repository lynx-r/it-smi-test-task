import { ProfileInfrastructureModule } from "@infrastructure/adapters/profile/profile-infrastructure.module"
import { EnvConfigModule } from "@infrastructure/config/env-config.module"
import { PrismaModule } from "@infrastructure/orm/prisma/prisma.module"
import { SeedService } from "@infrastructure/orm/prisma/seed.service"
import { Module } from "@nestjs/common"

@Module({
  imports: [EnvConfigModule, PrismaModule, ProfileInfrastructureModule],
  providers: [SeedService],
  exports: [EnvConfigModule, PrismaModule, ProfileInfrastructureModule],
})
export class InfrastructureModule {}
