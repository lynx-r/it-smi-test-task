import { ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsString } from "class-validator"

export class SkillDto {
  /**
   * name href
   */
  @Expose()
  @ApiResponseProperty()
  @IsString()
  name: string
}
