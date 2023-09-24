import { authService } from '../../services/auth/auth.service'

export const userQueries = {
  Query: {
    userProfile(_: any, { email }: { email: string }, context: any) {
      const user = authService.profile(email)
      return user
    }
  }
}
