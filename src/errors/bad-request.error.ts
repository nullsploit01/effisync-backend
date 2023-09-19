import { ApolloServerErrorCode } from '@apollo/server/errors'

import { CustomError } from './custom.error'

export class BadRequestError extends CustomError {
  statusCode = 400

  constructor(public message: string) {
    super(message)
  }
  serializeErrors() {
    return [{ code: ApolloServerErrorCode.BAD_REQUEST, message: this.message }]
  }
}
