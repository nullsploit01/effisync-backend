import jwt from 'jsonwebtoken'

import { environment } from '../../config/environment'
import { IUserPayload } from '../../interface/IUser'

class JWTService {
  async createUserPayload(payload: IUserPayload) {
    return jwt.sign(payload, environment.jwtSecret, {
      expiresIn: '1d'
    })
  }

  async verifyUserPayload(token: string) {
    return jwt.verify(token, environment.jwtSecret) as IUserPayload
  }

  async decodeUserPayload(token: string) {
    return jwt.decode(token) as IUserPayload
  }
}

const jwtService = new JWTService()
export { jwtService }
