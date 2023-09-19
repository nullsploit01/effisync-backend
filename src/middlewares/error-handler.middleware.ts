// import { logger } from '../config/logger'
// import { CustomError } from '../errors/custom.error'
// import { IErrorHandler } from '../errors/interface'

// export const errorHandler: IErrorHandler = (err, req, res, next) => {
//   logger.error(err)

//   if (err instanceof CustomError) {
//     return res.status(err.statusCode).send(err.serializeErrors())
//   }

//   return res.status(400).send({
//     response: 'Something went wrong',
//     success: false
//   })
// }
