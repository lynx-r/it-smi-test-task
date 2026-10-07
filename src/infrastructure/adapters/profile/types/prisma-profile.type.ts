import { Prisma } from "@prisma/client"

export type PrismaProfile = Prisma.ProfileGetPayload<{
  where: { active: true }
  include: {
    experience: true
    links: true
    projects: {
      include: {
        links: true
      }
    }
    skills: true
  }
}>

export type PrismaProject = Prisma.ProjectGetPayload<{
  where: { active: true }
  include: {
    links: true
  }
}>
