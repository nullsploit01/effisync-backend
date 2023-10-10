import jwt from 'jsonwebtoken'

import { environment } from '../../config/environment'
import { IUserPayload } from '../../interface/IUser'

class JWTService {
  createUserPayload(payload: IUserPayload) {
    return jwt.sign(payload, environment.jwtSecret, {
      expiresIn: '30d'
    })
  }

  verifyUserPayload(token: string) {
    return jwt.verify(token, environment.jwtSecret) as IUserPayload
  }

  decodeUserPayload(token: string) {
    return jwt.decode(token) as IUserPayload
  }
}

const jwtService = new JWTService()
export { jwtService }
