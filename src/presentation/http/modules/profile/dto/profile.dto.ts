import { ApiPropertyOptional, ApiResponseProperty } from "@nestjs/swagger"
import { ExperienceDto } from "@presentation/http/modules/profile/dto/experience.dto"
import { LinkDto } from "@presentation/http/modules/profile/dto/link.dto"
import { ProjectDto } from "@presentation/http/modules/profile/dto/project.dto"
import { SkillDto } from "@presentation/http/modules/profile/dto/skill.dto"
import { Expose, Type } from "class-transformer"
import { IsBoolean, IsString, IsUUID } from "class-validator"

export class ProfileDto {
  /**
   * profile id
   */
  @Expose()
  @ApiResponseProperty()
  @IsUUID()
  id: string

  /**
   * profile name
   */
  @Expose()
  @ApiResponseProperty()
  @IsString()
  name: string

  /**
   * profile description
   */
  @Expose()
  @ApiPropertyOptional({
    readOnly: true,
  })
  @IsString()
  description?: string

  /**
   * profile activity
   */
  @Expose()
  @ApiResponseProperty({ type: Boolean })
  @IsBoolean()
  active: boolean

  /**
   * links
   */
  @Expose()
  @Type(() => LinkDto)
  @ApiResponseProperty({ type: [LinkDto] })
  links: LinkDto[]

  /**
   * Skill
   */
  @Expose()
  @Type(() => SkillDto)
  @ApiResponseProperty({ type: [SkillDto] })
  skills: SkillDto[]

  /**
   * Experience
   */
  @Expose()
  @Type(() => ExperienceDto)
  @ApiResponseProperty({ type: [ExperienceDto] })
  experience: ExperienceDto[]

  /**
   * Project
   */
  @Expose()
  @Type(() => ProjectDto)
  @ApiResponseProperty({ type: [ProjectDto] })
  projects: ProjectDto[]
}
