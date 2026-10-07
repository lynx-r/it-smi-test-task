import { EnvConfigModule } from "@infrastructure/config/env-config.module"
import { PrismaModule } from "@infrastructure/orm/prisma/prisma.module"
import { SeedService } from "@infrastructure/orm/prisma/seed.service"
import { Module } from "@nestjs/common"

@Module({
  imports: [EnvConfigModule, PrismaModule],
  providers: [SeedService],
})
export class SeedModule {}
