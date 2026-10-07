import { Field, ObjectType } from "@nestjs/graphql"
import { LinkDto } from "@presentation/graphql/modules/profile/dto/link.dto"
import { IsString } from "class-validator"

@ObjectType()
export class ProjectDto {
  @Field()
  @IsString()
  name: string

  @Field(() => [LinkDto])
  @IsString()
  links: LinkDto[]
}
