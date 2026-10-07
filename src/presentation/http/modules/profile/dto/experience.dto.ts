import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsString } from "class-validator"

export class ExperienceDto {
  /**
   * link href
   */
  @Expose()
  @ApiResponseProperty()
  @IsString()
  company: string

  @Expose()
  @ApiResponseProperty()
  @IsString()
  position: string

  @Expose()
  @ApiProperty({
    nullable: true,
    readOnly: true,
  })
  @IsString()
  startWorkDate: Date | null

  @Expose()
  @ApiProperty({
    nullable: true,
    readOnly: true,
  })
  @IsString()
  endWorkDate: Date | null

  @Expose()
  @ApiProperty({
    nullable: true,
    readOnly: true,
  })
  @IsString()
  archives: string | null
}
