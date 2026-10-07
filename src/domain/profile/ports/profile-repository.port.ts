import type { Profile } from "@domain/profile/entities/profile.entity"

export const PROFILE_REPOSITORY_PORT = Symbol("PROFILE_REPOSITORY_PORT")

export interface ProfilesRepositoryPort {
  findActive(): Promise<Profile | null>
}
