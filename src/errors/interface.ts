import { NextFunction, Request, Response } from 'express'

export interface IErrorResponse {
  response: string | Record<string, string>[]
  success: boolean
  field?: string
}

export interface IErrorHandler {
  (err: Error, req: Request, res: Response, next: NextFunction): Response
}

export interface IRequireAuth {
  (req: Request, res: Response, next: NextFunction): void
}

export interface IValidateRequest {
  (req: Request, res: Response, next: NextFunction): void
}
