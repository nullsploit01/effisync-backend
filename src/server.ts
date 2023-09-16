import 'dotenv/config'
import express from 'express'

import { expressMiddleware } from '@apollo/server/express4'

import { logger } from './config/logger'
import { server } from './graphql'

const app = express()

app.get('/', (req, res) => {
  res.json({ message: 'Hello There!' })
})

const main = async () => {
  await server.start()

  app.use('/graphql', express.json(), expressMiddleware(server))

  app.listen(process.env.PORT, () => {
    logger.info(`Server is running on http://localhost:${process.env.PORT}/graphql`)
  })
}

main().catch((error) => {
  logger.error(error)
})
