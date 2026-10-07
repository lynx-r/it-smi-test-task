import { Experience } from "@domain/profile/value-objects/experience.value-object"
import { Link } from "@domain/profile/value-objects/link.value-object"
import { Project } from "@domain/profile/value-objects/project.value-object"
import { Skill } from "@domain/profile/value-objects/skill.value-object"
import { ExperienceDto } from "@presentation/graphql/modules/profile/dto/experience.dto"
import { LinkDto } from "@presentation/graphql/modules/profile/dto/link.dto"
import { ProjectDto } from "@presentation/graphql/modules/profile/dto/project.dto"
import { SkillDto } from "@presentation/graphql/modules/profile/dto/skill.dto"

export class ValueObjectsMapper {
  static toDtoLink(link: Link): LinkDto {
    return {
      href: link.href,
      text: link.text,
    }
  }

  static toDtoExperience(experience: Experience): ExperienceDto {
    return {
      company: experience.company,
      position: experience.position,
      startWorkDate: experience.startWorkDate,
      endWorkDate: experience.endWorkDate,
      archives: experience.archives,
    }
  }

  static toDtoProject(project: Project): ProjectDto {
    return {
      name: project.name,
      links: project.links.map(ValueObjectsMapper.toDtoLink),
    }
  }

  static toDtoSkill(project: Skill): SkillDto {
    return {
      name: project.name,
    }
  }
}
