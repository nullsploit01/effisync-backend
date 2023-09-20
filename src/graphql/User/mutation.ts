import { authService } from '../../services/auth/auth.service'

export const userMutations = {
  Mutation: {
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user = await authService.login(email, password)
      return user
    },
    register: async (
      _: any,
      { name, email, password }: { name: string; email: string; password: string }
    ) => {
      const user = await authService.register(name, email, password)
      return user
    }
  }
}
