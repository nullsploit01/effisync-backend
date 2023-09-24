import validator from 'validator'

import { jwtService } from '../../src/services/jwt/jwt.service'

import { mockUserPayload } from '../config/mock-data'

describe('JWT Service', () => {
  it('Should create a JWT token', () => {
    const payload = jwtService.createUserPayload(mockUserPayload)
    expect(validator.isJWT(payload)).toBe(true)
  })

  it('Should verify a JWT token', () => {
    const payload = jwtService.createUserPayload(mockUserPayload)
    const verifiedPayload = jwtService.verifyUserPayload(payload)
    expect(verifiedPayload).toMatchObject(mockUserPayload)
  })

  it('Should decode a JWT token', () => {
    const payload = jwtService.createUserPayload(mockUserPayload)
    const decodedPayload = jwtService.decodeUserPayload(payload)
    expect(decodedPayload).toMatchObject(mockUserPayload)
  })

  it('Should throw an error when verifying an invalid JWT token', () => {
    const payload = jwtService.createUserPayload(mockUserPayload)
    const invalidPayload = payload + 'invalid'
    expect(() => jwtService.verifyUserPayload(invalidPayload)).toThrow()
  })
})
