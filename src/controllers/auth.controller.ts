import { BadRequestError } from '../errors/bad-request.error'
import { User } from '../models/user'
import { IControllerAsyncMethod } from './interface'

class AuthController {
  register: IControllerAsyncMethod = async (req, res, next) => {
    try {
      const { name, email, password } = req.body
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        throw new BadRequestError('Email already in use')
      }

      const user = User.build({ name, email, password })
      await user.save()
      res.send('register')
    } catch (err) {
      next(err)
    }
  }

  login: IControllerAsyncMethod = async (req, res, next) => {
    try {
      res.send('login')
    } catch (err) {
      next(err)
    }
  }
}

const authController = new AuthController()
export { authController }
