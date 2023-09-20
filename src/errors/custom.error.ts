import { GraphQLError, GraphQLErrorOptions } from 'graphql'

import { IErrorResponse } from './interface'

export abstract class CustomError extends GraphQLError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    super(message, options)
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors(): IErrorResponse[]
}
