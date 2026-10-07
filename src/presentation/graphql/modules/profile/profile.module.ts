import { ProfileApplicationModule } from "@application/profile/profile-application.module"
import { Module } from "@nestjs/common"
import { ProfileResolver } from "@presentation/graphql/modules/profile/profile.resolver"

@Module({
  imports: [ProfileApplicationModule],
  providers: [ProfileResolver],
})
export class ProfileGraphqlModule {}
