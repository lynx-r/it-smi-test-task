import { Link } from "@domain/profile/value-objects/link.value-object"

export interface Project {
  name: string
  links: Link[]
}
