import { ApolloServerErrorCode } from '@apollo/server/errors'

import { CustomError } from './custom.error'

export class NotAuthorizedError extends CustomError {
  constructor(public message = 'Not Authorized') {
    super(message, {
      extensions: { code: ApolloServerErrorCode.BAD_REQUEST, http: { status: 401 } }
    })

    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }

  serializeErrors() {
    return [{ code: 'NOT_AUTHORIZED', message: this.message }]
  }
}
