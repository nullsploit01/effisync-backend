import { userMutations } from './mutation'
import { userQueries } from './query'

export const userResolvers = {
  ...userQueries,
  ...userMutations
}
