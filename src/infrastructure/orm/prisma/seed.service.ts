import { EnvProfileService } from "@infrastructure/config/env-profile.service"
import { PrismaService } from "@infrastructure/orm/prisma/prisma.service"
import { Injectable, Logger } from "@nestjs/common"

@Injectable()
export class SeedService {
  logger = new Logger(SeedService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly envProfile: EnvProfileService,
  ) {}

  async run() {
    const count = await this.prisma.profile.count()

    if (count > 0) {
      this.logger.verbose("Data already seeded.")
      return
    }

    this.logger.verbose("Seed Active profile started ...")
    await this.seedActiveProfile()

    this.logger.verbose("Seed service finished :)")
  }

  private async seedActiveProfile() {
    const activeProfile = this.envProfile.activeProfile
    if (activeProfile === null) {
      return
    }

    const { name, description, experience, links, projects, skills } = activeProfile

    await this.prisma.profile.upsert({
      where: { name },
      update: {
        name,
        description,
        active: true,
        experience: {
          deleteMany: {},
          createMany: {
            data: experience,
          },
        },
        links: {
          deleteMany: {},
          createMany: {
            data: links,
          },
        },
        projects: {
          deleteMany: {},
          create: projects.map((project) => ({
            name: project.name,
            links: {
              create: project.links.map((link) => ({ href: link.href, text: link.text })),
            },
          })),
        },
        skills: {
          deleteMany: {},
          createMany: {
            data: skills,
          },
        },
      },
      create: {
        name,
        description,
        active: true,
        experience: {
          createMany: {
            data: experience,
          },
        },
        links: {
          createMany: {
            data: links,
          },
        },
        projects: {
          create: projects.map((project) => ({
            name: project.name,
            links: {
              create: project.links.map((link) => ({ href: link.href, text: link.text })),
            },
          })),
        },
        skills: {
          createMany: {
            data: skills,
          },
        },
      },
    })
  }
}
