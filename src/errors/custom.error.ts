import { GraphQLError } from 'graphql'

import { IErrorResponse } from './interface'

export abstract class CustomError extends GraphQLError {
  abstract statusCode: number

  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors(): IErrorResponse[]
}
