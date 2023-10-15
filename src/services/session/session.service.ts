import { generateRandomId } from '../../utils/id.util'
import { storageService } from '../storage/storage.service'

const SESSION_TIMEOUT = 60 * 60 * 24 * 30 // 30 days

class SessionService {
  generateToken() {
    return generateRandomId()
  }

  createSession(userId: string, sessionTTL = SESSION_TIMEOUT) {
    const token = this.generateToken()
    storageService.set(token, userId, sessionTTL)

    return token
  }

  deleteSession(token: string) {
    return storageService.delete(token)
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
