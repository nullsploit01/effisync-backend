import { CustomError } from './custom.error'

export class NotFoundError extends CustomError {
  statusCode = 404

  constructor(public message = 'Route Not Found') {
    super(message)
  }

  serializeErrors() {
    return [{ code: 'NOT_FOUND', message: this.message }]
  }
}
