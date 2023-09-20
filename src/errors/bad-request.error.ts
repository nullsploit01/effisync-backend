import { ApolloServerErrorCode } from '@apollo/server/errors'

import { CustomError } from './custom.error'

export class BadRequestError extends CustomError {
  constructor(public message: string) {
    super(message, {
      extensions: { code: ApolloServerErrorCode.BAD_REQUEST, http: { status: 400 } }
    })

    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
  serializeErrors() {
    return [{ code: ApolloServerErrorCode.BAD_REQUEST, message: this.message }]
  }
}
