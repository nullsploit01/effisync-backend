import { userMutations } from './mutation'

export const userResolvers = {
  Query: {
    userProfile() {}
  },
  ...userMutations
}
