import { authService } from '../../services/auth/auth.service'
import { userMutations } from './mutation'

export const userResolvers = {
  Query: {
    userProfile(_: any, { email }: { email: string }) {
      const user = authService.profile(email)
      return user
    }
  },
  ...userMutations
}
