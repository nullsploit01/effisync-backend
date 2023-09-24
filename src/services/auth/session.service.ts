import { randomBytes } from 'crypto'

import { storageService } from '../storage/storage.service'

class SessionService {
  generateToken() {
    return randomBytes(24).toString('hex')
  }

  createSession(userId: string) {
    const token = this.generateToken()
    storageService.set(token, userId)

    return token
  }

  deleteSession(token: string) {
    return storageService.del(token)
  }

  getUserId(token: string) {
    return storageService.get(token)
  }

  isSessionValid(token: string) {
    return storageService.has(token)
  }

  flush() {
    return storageService.flush()
  }
}

const sessionService = new SessionService()
export { sessionService }
