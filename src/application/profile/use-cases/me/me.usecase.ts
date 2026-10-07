import type { MeOutput } from "@application/profile/use-cases/me/me.output"
import { DomainException } from "@domain/common/errors/domain.exception"
import { ProfileErrors } from "@domain/profile/errors/profile.exceptions"
import {
  PROFILE_REPOSITORY_PORT,
  type ProfilesRepositoryPort,
} from "@domain/profile/ports/profile-repository.port"
import { Inject, Injectable } from "@nestjs/common"

@Injectable()
export class MeUseCase {
  constructor(
    @Inject(PROFILE_REPOSITORY_PORT)
    private readonly profilesRepo: ProfilesRepositoryPort,
  ) {}

  async execute(): Promise<MeOutput> {
    // example instead taking active profile logged in can be taken
    const profile = await this.profilesRepo.findActive()
    if (!profile) {
      throw new DomainException(ProfileErrors.ProfileNotFound)
    }

    return {
      id: profile.id,
      name: profile.name,
      description: profile.description || undefined,
      active: profile.active,
      experience: profile.experience,
      links: profile.links,
      projects: profile.projects,
      skills: profile.skills,
    }
  }
}
