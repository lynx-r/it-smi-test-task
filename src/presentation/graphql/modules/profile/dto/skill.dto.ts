import { Field, ObjectType } from "@nestjs/graphql"
import { IsString } from "class-validator"

@ObjectType()
export class SkillDto {
  @Field()
  @IsString()
  name: string
}
