import { authService } from './../../services/auth/auth.service'

export const userResolvers = {
  Query: {
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user = await authService.login(email, password)
      return user
    }
  }
}
