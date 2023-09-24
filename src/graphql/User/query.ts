import { NotAuthorizedError } from '../../errors/not-authorized.error'
import { authService } from '../../services/auth/auth.service'
import { IUserPayload } from './../../interface/IUser'

export const userQueries = {
  Query: {
    userProfile(_: any, __: any, { user }: { user: IUserPayload | null }) {
      if (!user) throw new NotAuthorizedError()

      const userProfile = authService.profile(user.email)
      return userProfile
    }
  }
}
