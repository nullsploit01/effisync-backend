import validator from 'validator'

import { BadRequestError } from '../../errors/bad-request.error'

export const validateRegisterParameters = (name: string, email: string, password: string) => {
  if (!validator.isEmail(email)) throw new BadRequestError('Invalid email')
  if (!validator.isStrongPassword(password))
    throw new BadRequestError(
      'Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol'
    )
  if (!validator.isLength(name, { min: 3, max: 50 }))
    throw new BadRequestError('Name must be between 3 and 50 characters long')
}

export const validateLoginParameters = (email: string, password: string) => {
  if (!validator.isEmail(email)) throw new BadRequestError('Invalid email')
}

export const validateProfileParameters = (email: string) => {
  if (!validator.isEmail(email)) throw new BadRequestError('Invalid email')
}

export const validateLogoutParameters = (sessionToken: string) => {
  if (!sessionToken.trim()) throw new BadRequestError('Invalid session token')
  if (!validator.isLength(sessionToken, { min: 48, max: 48 }))
    throw new BadRequestError('Invalid session token')
}
