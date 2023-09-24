import { BadRequestError } from '../../errors/bad-request.error'
import { NotFoundError } from '../../errors/not-found.error'
import { User } from '../../models/user'
import { ILogin, IProfile, IRegister } from './interface'
import { jwtService } from './jwt.service'
import { passwordService } from './password.service'
import { sessionService } from './session.service'

class AuthService {
  register: IRegister = async (name, email, password) => {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new BadRequestError('Email already in use')
    }

    const user = User.build({ name, email, password })
    await user.save()

    const sessionToken = sessionService.createSession(user.id)
    const token = await jwtService.createUserPayload({
      id: user.id,
      email: user.email,
      sessionToken
    })

    return { user, token }
  }

  login: ILogin = async (email, password) => {
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials')
    }

    if (!existingUser.password) {
      throw new BadRequestError('You must login with Google')
    }

    const passwordMatch = await passwordService.compare(existingUser.password, password)
    if (!passwordMatch) {
      throw new BadRequestError('Invalid Credentials')
    }

    const sessionToken = await sessionService.createSession(existingUser.id)
    const token = await jwtService.createUserPayload({
      id: existingUser.id,
      email: existingUser.email,
      sessionToken
    })

    return { user: existingUser, token }
  }

  profile: IProfile = async (email) => {
    const user = await User.findOne({ email })

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return user
  }
}

const authService = new AuthService()
export { authService }
