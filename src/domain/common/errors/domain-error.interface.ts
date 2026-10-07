import type { ModuleNames } from "@src/constants"

export interface DomainErrorDescriptor {
  message: string
  statusCode: number
  developerMessage?: string
  code: number
  module: ModuleNames
}
