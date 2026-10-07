import { Field, ID, ObjectType } from "@nestjs/graphql"
import { ExperienceDto } from "@presentation/graphql/modules/profile/dto/experience.dto"
import { LinkDto } from "@presentation/graphql/modules/profile/dto/link.dto"
import { ProjectDto } from "@presentation/graphql/modules/profile/dto/project.dto"
import { SkillDto } from "@presentation/graphql/modules/profile/dto/skill.dto"
import { IsBoolean, IsString, IsUUID } from "class-validator"

@ObjectType()
export class ProfileDto {
  @Field(() => ID)
  @IsUUID()
  id: string

  @Field()
  @IsString()
  name: string

  @Field(() => String, { nullable: true })
  @IsString()
  description?: string

  @Field()
  @IsBoolean()
  active: boolean

  @Field(() => [LinkDto])
  links: LinkDto[]

  @Field(() => [SkillDto])
  skills: SkillDto[]

  @Field(() => [ExperienceDto])
  experience: ExperienceDto[]

  @Field(() => [ProjectDto])
  projects: ProjectDto[]
}
