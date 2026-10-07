export interface MeOutput {
  readonly id: string
  name: string
  description?: string
  active: boolean
  links: Link[]
  skills: Skill[]
  experience: Experience[]
  projects: Project[]
}

interface Link {
  href: string
  text: string
}

interface Experience {
  company: string
  position: string
  startWorkDate: Date | null
  endWorkDate: Date | null
  archives: string | null
}

interface Project {
  name: string
  links: Link[]
}

interface Skill {
  name: string
}
