import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql"
import { IsString } from "class-validator"

@ObjectType()
export class ExperienceDto {
  @Field()
  @IsString()
  company: string

  @Field()
  @IsString()
  position: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsString()
  startWorkDate: Date | null

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsString()
  endWorkDate: Date | null

  @Field(() => String, { nullable: true })
  @IsString()
  archives: string | null
}
