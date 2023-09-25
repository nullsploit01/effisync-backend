import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'

import { environment } from './config/environment'
import { logger } from './config/logger'
import { BadRequestError } from './errors/bad-request.error'
import { schema } from './graphql'
import { IUserPayload } from './interface/IUser'
import { jwtService } from './services/jwt/jwt.service'
import { sessionService } from './services/session/session.service'

interface IContext {
  user: IUserPayload | null
}

const app = express()

const main = async () => {
  const server = new ApolloServer<IContext>({
    schema
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization
        if (!token) return { user: null }

        // verify user payload
        const user = jwtService.verifyUserPayload(token)
        if (!user) {
          return { user: null }
        }

        // check if session is valid
        const { sessionToken } = user
        const isSessionValid = sessionService.isSessionValid(sessionToken)

        if (!isSessionValid) {
          throw new BadRequestError('Session Expired, please login again')
        }

        return { user }
      }
    })
  )

  await mongoose.connect(environment.mongoDbConnectionString)
  logger.info('Connected to MongoDB!')

  app.listen(environment.port, () => {
    logger.info(`Server is running on port: ${environment.port}`)
  })
}

main().catch((error) => {
  logger.error(error)
})
