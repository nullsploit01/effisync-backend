import { sessionService } from '../../src/services/session/session.service'

describe('Session Service', () => {
  describe('createSession', () => {
    it('should create a session with default TTL', () => {
      const token = sessionService.createSession('1234')
      expect(token).toBeDefined()
      expect(token.length).toBe(48)
    })

    it('should create a session with custom TTL', () => {
      const token = sessionService.createSession('1234', 60)
      expect(token).toBeDefined()
      expect(token.length).toBe(48)
    })
  })

  describe('deleteSession', () => {
    let token: string
    beforeEach(() => {
      sessionService.flush()
      token = sessionService.createSession('1234')
    })

    it('should delete a session', () => {
      const deleted = sessionService.deleteSession(token)
      expect(deleted).toBe(1)

      const userId = sessionService.getUserId(token)
      expect(userId).toBeNull()
    })

    it('should not delete a session if token is invalid', () => {
      const deleted = sessionService.deleteSession('invalid')
      expect(deleted).toBe(0)
    })
  })

  describe('getUserId', () => {
    let token: string
    beforeEach(() => {
      sessionService.flush()
      token = sessionService.createSession('1234')
    })

    it('should get the user ID from a valid token', () => {
      const userId = sessionService.getUserId(token)
      expect(userId).toBe('1234')
    })

    it('should not get the user ID from an invalid token', () => {
      const userId = sessionService.getUserId('invalid')
      expect(userId).toBeNull()
    })

    it('should not get the user ID from an expired token', () => {
      sessionService.deleteSession(token)
      const userId = sessionService.getUserId(token)
      expect(userId).toBeNull()
    })

    it('should not get the user ID from a flushed token', () => {
      sessionService.flush()
      const userId = sessionService.getUserId(token)
      expect(userId).toBeNull()
    })
  })

  describe('isSessionValid', () => {
    let token: string
    beforeEach(() => {
      sessionService.flush()
      token = sessionService.createSession('1234')
    })

    it('should validate a valid token', () => {
      const isValid = sessionService.isSessionValid(token)
      expect(isValid).toBe(true)
    })

    it('should not validate an invalid token', () => {
      const isValid = sessionService.isSessionValid('invalid')
      expect(isValid).toBe(false)
    })

    it('should not validate an expired token', () => {
      sessionService.deleteSession(token)
      const isValid = sessionService.isSessionValid(token)
      expect(isValid).toBe(false)
    })

    it('should not validate a flushed token', () => {
      sessionService.flush()
      const isValid = sessionService.isSessionValid(token)
      expect(isValid).toBe(false)
    })
  })

  describe('flush', () => {
    let token: string
    beforeEach(() => {
      sessionService.flush()
      token = sessionService.createSession('1234')
    })

    it('should flush all sessions', () => {
      sessionService.flush()

      const userId = sessionService.getUserId(token)
      expect(userId).toBeNull()
    })
  })
})
