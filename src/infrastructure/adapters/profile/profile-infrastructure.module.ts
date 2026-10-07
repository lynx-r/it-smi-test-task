import { PROFILE_REPOSITORY_PORT } from "@domain/profile/ports/profile-repository.port"
import { PrismaProfilesRepository } from "@infrastructure/adapters/profile/profile.repository.adapter"
import { PrismaModule } from "@infrastructure/orm/prisma/prisma.module"
import { Module } from "@nestjs/common"

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: PROFILE_REPOSITORY_PORT,
      useClass: PrismaProfilesRepository,
    },
  ],
  exports: [PROFILE_REPOSITORY_PORT],
})
export class ProfileInfrastructureModule {}
