import { DomainErrorDescriptor } from "@domain/common/errors/domain-error.interface"
import { ModuleNames } from "@src/constants"

export const ProfileErrors: Record<string, DomainErrorDescriptor> = {
  ProfileNotFound: {
    code: 1,
    statusCode: 400,
    module: ModuleNames.ProfileModule,
    message: "Profile not found",
  },
}
