import type { MeOutput } from "@application/profile/use-cases/me/me.output"
import type { ProfileDto } from "@presentation/graphql/modules/profile/dto/profile.dto"
import { ValueObjectsMapper } from "@presentation/graphql/modules/profile/mappers/value-objects.mapper"

export class MeResponseMapper {
  static toDto(output: MeOutput): ProfileDto {
    const links = output.links.map(ValueObjectsMapper.toDtoLink)
    const skills = output.skills.map(ValueObjectsMapper.toDtoSkill)
    const experience = output.experience.map(ValueObjectsMapper.toDtoExperience)
    const projects = output.projects.map(ValueObjectsMapper.toDtoProject)

    return {
      id: output.id,
      name: output.name,
      description: output.description,
      active: output.active,
      links,
      skills,
      experience,
      projects,
    }
  }
}
