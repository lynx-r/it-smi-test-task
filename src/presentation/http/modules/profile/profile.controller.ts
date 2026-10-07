import { ME_USE_CASE, MeUseCasePort } from "@application/profile/use-cases/me/me-usecase.port"
import { ProfileErrors } from "@domain/profile/errors/profile.exceptions"
import { Controller, Get, Inject } from "@nestjs/common"
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { apiErrorResponses } from "@presentation/http/common/decorators/api-error-response.decorator"
import { ProfileDto } from "@presentation/http/modules/profile/dto/profile.dto"
import { MeResponseMapper } from "@presentation/http/modules/profile/mappers/me-response.mapper"

@ApiTags("Profile")
@Controller("profile")
export class ProfileController {
  constructor(
    @Inject(ME_USE_CASE)
    private readonly meUseCase: MeUseCasePort,
  ) {}

  @Get("me")
  @ApiOperation({
    operationId: "me",
    summary: "Get my information",
    description: "return the requester informations by requester Token",
  })
  @ApiResponse({
    type: ProfileDto,
    status: 200,
  })
  @ApiBearerAuth()
  @apiErrorResponses([ProfileErrors.ProfileNotFound])
  async me(): Promise<ProfileDto> {
    const output = await this.meUseCase.execute()
    return MeResponseMapper.toDto(output)
  }
}
