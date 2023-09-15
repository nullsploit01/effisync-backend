import express from 'express'
import 'dotenv/config'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { logger } from './config/logger'
import { startStandaloneServer } from '@apollo/server/standalone'
import { server } from './graphql'
import http from 'http'

const app = express()
const httpServer = http.createServer(app)

app.get('/', (req, res) => {
  res.json({ message: 'Hello There!' })
})

const main = async () => {
  server.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer }))
  const { url } = await startStandaloneServer(server)
  logger.info(`GraphQL Server ready at ${url}`)

  app.listen(process.env.PORT, () => {
    logger.info(`Server is running on port ${process.env.PORT}!`)
  })
}

main().catch((error) => {
  logger.error(error)
})
