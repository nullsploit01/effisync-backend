import { IUserPayload } from '../../interface/IUser'
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
      const { user, token } = await authService.register(name, email, password)
      return { user, token }
    },

    logout: async (_: any, __: any, { user }: { user: IUserPayload }) => {
      if (!user) {
        return true
      }

      await authService.logout(user.sessionToken)
      return true
    }
  }
}
