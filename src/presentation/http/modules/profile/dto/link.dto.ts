import { ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsString } from "class-validator"

export class LinkDto {
  /**
   * link href
   */
  @Expose()
  @ApiResponseProperty()
  @IsString()
  href: string

  /**
   * link text
   */
  @Expose()
  @ApiResponseProperty()
  @IsString()
  text: string
}
