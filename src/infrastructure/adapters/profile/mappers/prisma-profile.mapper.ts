import { Profile } from "@domain/profile/entities/profile.entity"
import { Experience } from "@domain/profile/value-objects/experience.value-object"
import { Link } from "@domain/profile/value-objects/link.value-object"
import { Project } from "@domain/profile/value-objects/project.value-object"
import { Skill } from "@domain/profile/value-objects/skill.value-object"
import {
  PrismaProfile,
  PrismaProject,
} from "@infrastructure/adapters/profile/types/prisma-profile.type"
import {
  Experience as PrismaExperience,
  Link as PrismaLink,
  Skill as PrismaSkill,
} from "@prisma/client"

export class PrismaProfileMapper {
  static toDomain(row: PrismaProfile): Profile {
    const links = row.links.map(PrismaProfileMapper.toDomainLink)
    const skills = row.skills.map(PrismaProfileMapper.toDomainSkill)
    const project = row.projects.map(PrismaProfileMapper.toDomainProject)
    const experience = row.experience.map(PrismaProfileMapper.toExperience)
    return new Profile(
      row.id,
      row.name,
      row.description || undefined,
      row.active,
      links,
      skills,
      experience,
      project,
    )
  }

  private static toDomainSkill(skill: PrismaSkill): Skill {
    return {
      name: skill.name,
    }
  }

  private static toExperience(experience: PrismaExperience): Experience {
    return {
      company: experience.company ?? "",
      position: experience.position ?? "",
      archives: experience.archives ?? "",
      startWorkDate: experience.startWorkDate,
      endWorkDate: experience.endWorkDate,
    }
  }

  private static toDomainLink(link: PrismaLink): Link {
    return {
      href: link.href,
      text: link.text,
    }
  }

  private static toDomainProject(project: PrismaProject): Project {
    return {
      name: project.name,
      links: project.links.map(PrismaProfileMapper.toDomainLink),
    }
  }
}
