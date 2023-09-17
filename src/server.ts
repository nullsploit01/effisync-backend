import cors from 'cors'
import 'dotenv/config'
import express from 'express'

import { expressMiddleware } from '@apollo/server/express4'

import { logger } from './config/logger'
import { server } from './graphql'

const app = express()

app.use(cors(), express.json())

const main = async () => {
  await server.start()

  app.use('/graphql', expressMiddleware(server))

  app.listen(process.env.PORT, () => {
    logger.info(`Server is running on http://localhost:${process.env.PORT}/graphql`)
  })
}

main().catch((error) => {
  logger.error(error)
})
