import 'dotenv/config'
import mongoose from 'mongoose'

import { startStandaloneServer } from '@apollo/server/standalone'

import { logger } from './config/logger'
import { server } from './graphql'

const main = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 }
  })

  logger.info(`Server ready at ${url}`)

  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!)
  logger.info('Connected to MongoDB!')
}

main().catch((error) => {
  logger.error(error)
})
