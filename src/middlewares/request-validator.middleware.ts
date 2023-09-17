import { validationResult } from 'express-validator'

import { IValidateRequest } from '../errors/interface'
import { RequestValidationError } from '../errors/request-validation.error'

export const requestValidator: IValidateRequest = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  next()
}
