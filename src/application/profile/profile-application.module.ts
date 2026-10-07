import { ME_USE_CASE } from "@application/profile/use-cases/me/me-usecase.port"
import { MeUseCase } from "@application/profile/use-cases/me/me.usecase"
import { ProfileInfrastructureModule } from "@infrastructure/adapters/profile/profile-infrastructure.module"
import { Module } from "@nestjs/common"

@Module({
  imports: [ProfileInfrastructureModule],
  providers: [
    MeUseCase,
    {
      provide: ME_USE_CASE,
      useExisting: MeUseCase,
    },
  ],
  exports: [ME_USE_CASE],
})
export class ProfileApplicationModule {}
