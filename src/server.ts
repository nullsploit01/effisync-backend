import mongoose from 'mongoose'

import { startStandaloneServer } from '@apollo/server/standalone'

import { environment } from './config/environment'
import { logger } from './config/logger'
import { server } from './graphql'

const main = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(environment.port) || 4000 }
  })

  logger.info(`Server ready at ${url}`)

  await mongoose.connect(environment.mongoDbConnectionString)
  logger.info('Connected to MongoDB!')
}

main().catch((error) => {
  logger.error(error)
})
