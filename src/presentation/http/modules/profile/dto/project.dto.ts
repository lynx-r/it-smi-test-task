import { ApiResponseProperty } from "@nestjs/swagger"
import { LinkDto } from "@presentation/http/modules/profile/dto/link.dto"
import { Expose, Type } from "class-transformer"
import { IsString } from "class-validator"

export class ProjectDto {
  /**
   * link href
   */
  @Expose()
  @ApiResponseProperty()
  @IsString()
  name: string

  /**
   * link text
   */
  @Expose()
  @Type(() => LinkDto)
  @ApiResponseProperty({
    type: () => [LinkDto],
  })
  @IsString()
  links: LinkDto[]
}
