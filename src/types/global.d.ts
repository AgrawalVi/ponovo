import { roleTypeEnum, statusEnum } from '.'

export {}

declare global {
  interface CustomJwtSessionClaims {
    applicationGoal?: number
    roleType?: roleTypeEnum
    timelineUpdateType?: statusEnum
  }
}
