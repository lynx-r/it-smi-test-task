import type { MeOutput } from "@application/profile/use-cases/me/me.output"

export const ME_USE_CASE = Symbol("ME_USE_CASE")

export interface MeUseCasePort {
  execute(): Promise<MeOutput>
}
