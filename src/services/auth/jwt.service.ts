import jwt from 'jsonwebtoken'

import { environment } from '../../config/environment'

class JWTService {
  async create(payload: any) {
    return jwt.sign(payload, environment.jwtSecret, {
      expiresIn: '1d'
    })
  }

  async verify(token: string) {
    return jwt.verify(token, environment.jwtSecret)
  }

  async decode(token: string) {
    return jwt.decode(token)
  }
}

const jwtService = new JWTService()
export { jwtService }
