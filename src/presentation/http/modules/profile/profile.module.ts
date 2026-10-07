import { ProfileApplicationModule } from "@application/profile/profile-application.module"
import { Module } from "@nestjs/common"
import { ProfileController } from "@presentation/http/modules/profile/profile.controller"

@Module({
  imports: [ProfileApplicationModule],
  controllers: [ProfileController],
})
export class ProfileHttpModule {}
