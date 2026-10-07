import { Experience } from "@domain/profile/value-objects/experience.value-object"
import { Link } from "@domain/profile/value-objects/link.value-object"
import { Project } from "@domain/profile/value-objects/project.value-object"
import { Skill } from "@domain/profile/value-objects/skill.value-object"
import { ConfigProfile } from "@infrastructure/config/env.types"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class EnvProfileService {
  constructor(private readonly configService: ConfigService) {}

  get activeProfile(): ConfigProfile {
    const name = this.configService.get<string>("ACTIVE_PROFILE_NAME") || ""
    const description = this.configService.get<string>("ACTIVE_PROFILE_DESCRIPTION") || ""

    let chunkSize = 5

    let experience: Experience[] = []
    const experienceRaw = this.configService.get<string>("ACTIVE_PROFILE_EXPERIENCE")?.split(";")
    if (experienceRaw) {
      experience = experienceRaw.reduce((acc, _, index) => {
        // Компания;Должность;Начало работы [например, 2026-03-01];Окончание [например, 2026-06-01];Достижения;Компания;Должность;Начало работы [например, 2026-03-01];Окончание [например, 2026-06-01];Достижения;...
        if (index % chunkSize === 0) {
          const experienceRow = experienceRaw?.slice(index, index + chunkSize)
          const company = experienceRow[0]
          const position = experienceRow[1]
          const startWorkDate = new Date(experienceRow[2])
          const endWorkDate = new Date(experienceRow[3])
          const archives = experienceRow[4]
          const experience: Experience = {
            company,
            position,
            startWorkDate,
            endWorkDate,
            archives,
          }
          acc.push(experience)
        }
        return acc
      }, [] as Experience[])
    }

    const links: Link[] = this.parseLinks(this.configService.get<string>("ACTIVE_PROFILE_LINKS"))

    chunkSize = 2
    let projects: Project[] = []
    const projectsRaw = this.configService.get<string>("ACTIVE_PROFILE_PROJECTS")?.split(";")
    if (projectsRaw) {
      projects = projectsRaw.reduce((acc, _, index) => {
        // Название;Ссылка на проект/репозиторий,Ссылка на проект/репозиторий;Название;Ссылка на проект/репозиторий;...
        if (index % chunkSize === 0) {
          const projectsRow = projectsRaw?.slice(index, index + chunkSize)
          const name = projectsRow[0]
          const linksRaw = projectsRow[1]
          const links = this.parseLinks(linksRaw, ",")
          const projects: Project = {
            name,
            links,
          }
          acc.push(projects)
        }
        return acc
      }, [] as Project[])
    }

    chunkSize = 1
    let skills: Skill[] = []
    const skillsRaw = this.configService.get<string>("ACTIVE_PROFILE_SKILLS")?.split(";")
    if (skillsRaw) {
      skills = skillsRaw.reduce((acc, _, index) => {
        // (деление по 1 chunk)
        if (index % chunkSize === 0) {
          const skillsRow = skillsRaw?.slice(index, index + chunkSize)
          const name = skillsRow[0]
          const skills: Skill = {
            name,
          }
          acc.push(skills)
        }
        return acc
      }, [] as Skill[])
    }

    return {
      name,
      description,
      active: true,
      experience,
      links,
      skills,
      projects,
    }
  }

  private parseLinks(linksString: string | undefined, splitBy = ";"): Link[] {
    const chunkSize = 2
    const linksRaw = linksString?.split(splitBy)
    if (linksRaw) {
      return linksRaw.reduce((acc, _, index) => {
        // Название Ресурса;Ссылка на ресурс;Название Ресурса;Ссылка на ресурс;...
        if (index % chunkSize === 0) {
          const linksRow = linksRaw?.slice(index, index + chunkSize)
          const text = linksRow[0]
          const href = linksRow[1]
          const links: Link = {
            href,
            text,
          }
          acc.push(links)
        }
        return acc
      }, [] as Link[])
    }
    return []
  }
}
