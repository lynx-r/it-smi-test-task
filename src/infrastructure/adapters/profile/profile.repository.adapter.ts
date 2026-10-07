import type { Profile } from "@domain/profile/entities/profile.entity"
import type { ProfilesRepositoryPort } from "@domain/profile/ports/profile-repository.port"
import { PrismaProfileMapper } from "@infrastructure/adapters/profile/mappers/prisma-profile.mapper"
import { PrismaService } from "@infrastructure/orm/prisma/prisma.service"
import { Injectable } from "@nestjs/common"

@Injectable()
export class PrismaProfilesRepository implements ProfilesRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findActive(): Promise<Profile | null> {
    const row = await this.prisma.profile.findFirstOrThrow({
      where: { active: true },
      include: {
        experience: true,
        links: true,
        projects: {
          include: {
            links: true,
          },
        },
        skills: true,
      },
    })
    return row ? PrismaProfileMapper.toDomain(row) : null
  }
}
