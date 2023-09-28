import cors from 'cors'
import express from 'express'
import { onRequest } from 'firebase-functions/v2/https'
import mongoose from 'mongoose'

import { expressMiddleware } from '@apollo/server/express4'

import { environment } from './config/environment'
import { logger } from './config/logger'
import { BadRequestError } from './errors/bad-request.error'
import { server } from './graphql'
import { jwtService } from './services/jwt/jwt.service'
import { sessionService } from './services/session/session.service'

const app = express()

app.use(cors())
app.use(express.json())

const main = async () => {
  await server.start()

  app.use(
    '*',
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
}

main().then(() => {
  mongoose
    .connect(environment.mongoDbConnectionString)
    .then(() => {
      logger.info('Connected to MongoDB')
    })
    .catch((error) => {
      logger.error(error)
    })

  if (environment.isLocalEnv) {
    app.listen(environment.port, () => {
      logger.info(`Server is running on http://localhost:${environment.port}/`)
    })
  }
})

exports.api = onRequest(app)
