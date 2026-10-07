import { ME_USE_CASE, MeUseCasePort } from "@application/profile/use-cases/me/me-usecase.port"
import { Inject } from "@nestjs/common"
import { Query, Resolver } from "@nestjs/graphql"
import { ProfileDto } from "@presentation/graphql/modules/profile/dto/profile.dto"
import { MeResponseMapper } from "@presentation/graphql/modules/profile/mappers/me-response.mapper"

@Resolver()
export class ProfileResolver {
  constructor(
    @Inject(ME_USE_CASE)
    private readonly meUseCase: MeUseCasePort,
  ) {}

  @Query(() => ProfileDto)
  async profile(): Promise<ProfileDto> {
    const output = await this.meUseCase.execute()
    return MeResponseMapper.toDto(output)
  }
}
