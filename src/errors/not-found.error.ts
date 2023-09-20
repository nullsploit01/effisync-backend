import { CustomError } from './custom.error'

export class NotFoundError extends CustomError {
  constructor(public message = 'Route Not Found') {
    super(message, {
      extensions: { code: 'NOT_FOUND', http: { status: 404 } }
    })

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors() {
    return [{ code: 'NOT_FOUND', message: this.message }]
  }
}
