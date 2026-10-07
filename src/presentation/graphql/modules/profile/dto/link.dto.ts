import { Field, ObjectType } from "@nestjs/graphql"
import { IsString } from "class-validator"

@ObjectType()
export class LinkDto {
  @Field()
  @IsString()
  href: string

  @Field()
  @IsString()
  text: string
}
