import { Experience } from "@domain/profile/value-objects/experience.value-object"
import { Link } from "@domain/profile/value-objects/link.value-object"
import { Project } from "@domain/profile/value-objects/project.value-object"
import { Skill } from "@domain/profile/value-objects/skill.value-object"

export class Profile {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string | undefined,
    public active: boolean,
    public links: Link[],
    public skills: Skill[],
    public experience: Experience[],
    public projects: Project[],
  ) {}
}
