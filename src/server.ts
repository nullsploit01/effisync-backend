import mongoose from 'mongoose'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { environment } from './config/environment'
import { logger } from './config/logger'
import { schema } from './graphql'
import { IUserPayload } from './interface/IUser'
import { jwtService } from './services/auth/jwt.service'

interface IContext {
  user: IUserPayload | null
}

const main = async () => {
  const server = new ApolloServer<IContext>({
    schema
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: environment.port },
    context: async ({ req }) => {
      const token = req.headers.authorization
      if (!token) return { user: null }

      const user = await jwtService.verifyUserPayload(token)

      return { user }
    }
  })

  logger.info(`Server ready at ${url}`)

  await mongoose.connect(environment.mongoDbConnectionString)
  logger.info('Connected to MongoDB!')
}

main().catch((error) => {
  logger.error(error)
})
