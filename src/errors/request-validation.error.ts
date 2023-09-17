import { ValidationError } from 'express-validator'

import { CustomError } from './custom.error'

export class RequestValidationError extends CustomError {
  statusCode = 400

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters')
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    return {
      response: this.errors.map((error) => {
        return { message: error.msg }
      }),
      success: false
    }
  }
}
