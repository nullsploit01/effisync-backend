import { CustomError } from './custom.error'

export class NotAuthorizedError extends CustomError {
  statusCode = 401

  constructor() {
    super('Not Authorized')
  }

  serializeErrors() {
    return [{ code: 'NOT_AUTHORIZED', message: 'Not Authorized' }]
  }
}
