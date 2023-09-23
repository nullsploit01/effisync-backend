import mongoose from 'mongoose'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { environment } from './config/environment'
import { logger } from './config/logger'
import { schema } from './graphql'

const main = async () => {
  const server = new ApolloServer({
    schema
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: environment.port }
  })

  logger.info(`Server ready at ${url}`)

  await mongoose.connect(environment.mongoDbConnectionString)
  logger.info('Connected to MongoDB!')
}

main().catch((error) => {
  logger.error(error)
})
