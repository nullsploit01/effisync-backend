import { authService } from '../../src/services/auth/auth.service'
import { jwtService } from '../../src/services/jwt/jwt.service'
import { sessionService } from '../../src/services/session/session.service'

import { userMockData } from '../config/mock-data'

describe('Auth Service', () => {
  describe('register', () => {
    it('should register a user', async () => {
      const { user } = await authService.register(
        userMockData.name,
        userMockData.email,
        userMockData.password
      )

      expect(user.name).toEqual(userMockData.name)
      expect(user.email).toEqual(userMockData.email)
    })

    it('should throw an error if email already exists', async () => {
      await authService.register(userMockData.name, userMockData.email, userMockData.password)

      await expect(
        authService.register(userMockData.name, userMockData.email, userMockData.password)
      ).rejects.toThrow()
    })

    it('should throw an error if password is not provided', async () => {
      await expect(
        authService.register(userMockData.name, userMockData.email, '')
      ).rejects.toThrow()
    })

    it('should throw an error if name is not provided', async () => {
      await expect(
        authService.register('', userMockData.email, userMockData.password)
      ).rejects.toThrow()
    })

    it('should throw an error if email is not provided', async () => {
      await expect(
        authService.register(userMockData.name, '', userMockData.password)
      ).rejects.toThrow()
    })

    it('should throw an error if email is invalid', async () => {
      await expect(
        authService.register(userMockData.name, 'invalid-email', userMockData.password)
      ).rejects.toThrow()
    })

    it('should throw an error if password is weak', async () => {
      await expect(
        authService.register(userMockData.name, userMockData.email, 'pass12')
      ).rejects.toThrow()
    })
  })

  describe('login', () => {
    beforeEach(async () => {
      await authService.register(userMockData.name, userMockData.email, userMockData.password)
    })

    it('should login a user', async () => {
      const { user } = await authService.login(userMockData.email, userMockData.password)

      expect(user.name).toEqual(userMockData.name)
      expect(user.email).toEqual(userMockData.email)
    })

    it('should throw an error if email is not provided', async () => {
      await expect(authService.login('', userMockData.password)).rejects.toThrow()
    })

    it('should throw an error if password is not provided', async () => {
      await expect(authService.login(userMockData.email, '')).rejects.toThrow()
    })

    it('should throw an error if email is invalid', async () => {
      await expect(authService.login('invalid-email', userMockData.password)).rejects.toThrow()
    })

    it('should throw error with invalid credentials', async () => {
      await expect(authService.login(userMockData.email, 'wrong-password')).rejects.toThrow()
    })
  })

  describe('profile', () => {
    beforeEach(async () => {
      await authService.register(userMockData.name, userMockData.email, userMockData.password)
    })

    it('should return a user profile', async () => {
      const user = await authService.profile(userMockData.email)

      expect(user.name).toEqual(userMockData.name)
      expect(user.email).toEqual(userMockData.email)
    })

    it('should throw an error if email is not provided', async () => {
      await expect(authService.profile('')).rejects.toThrow()
    })

    it('should throw an error if email is invalid', async () => {
      await expect(authService.profile('invalid-email')).rejects.toThrow()
    })

    it('should throw an error if user does not exist', async () => {
      await expect(authService.profile('somedifferentemail@test.com')).rejects.toThrow()
    })
  })

  describe('logout', () => {
    beforeEach(async () => {
      await authService.register(userMockData.name, userMockData.email, userMockData.password)
    })

    it('should logout a user', async () => {
      const { token } = await authService.login(userMockData.email, userMockData.password)
      const sessionToken = (await jwtService.verifyUserPayload(token)).sessionToken

      await authService.logout(sessionToken)

      const isSessionActive = sessionService.isSessionValid(sessionToken)
      expect(isSessionActive).toBeFalsy()
    })

    it('should throw an error if session token is not provided', async () => {
      await expect(authService.logout('')).rejects.toThrow()
    })

    it('should throw an error if session token is invalid', async () => {
      await expect(authService.logout('invalid-session-token')).rejects.toThrow()
    })
  })
})
