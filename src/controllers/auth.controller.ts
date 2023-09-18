import { authService } from '../services/auth/auth.service'
import { IControllerAsyncMethod } from './interface'

class AuthController {
  register: IControllerAsyncMethod = async (req, res, next) => {
    try {
      const { name, email, password } = req.body

      const user = await authService.register(name, email, password)
      return res.status(201).json({ success: true, response: user })
    } catch (err) {
      next(err)
    }
  }

  login: IControllerAsyncMethod = async (req, res, next) => {
    try {
      const { email, password } = req.body

      const user = await authService.login(email, password)
      return res.status(200).json({ success: true, response: user })
    } catch (err) {
      next(err)
    }
  }
}

const authController = new AuthController()
export { authController }
