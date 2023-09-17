import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'

import { expressMiddleware } from '@apollo/server/express4'

import { httpLogger, logger } from './config/logger'
import { server } from './graphql'
import { errorHandler } from './middlewares/error-handler.middleware'
import { authRouter } from './routes'

const app = express()

app.use(httpLogger())
app.use(cors(), express.json())

app.use('/auth', authRouter)

const main = async () => {
  await server.start()

  app.use('/graphql', expressMiddleware(server))

  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!)
  logger.info('Connected to MongoDB!')

  app.listen(process.env.PORT, () => {
    logger.info(`Server is running on http://localhost:${process.env.PORT}/graphql`)
  })
}

app.use(errorHandler)

main().catch((error) => {
  logger.error(error)
})
