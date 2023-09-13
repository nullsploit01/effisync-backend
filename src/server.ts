import express from 'express'

import 'dotenv/config'
import { logger } from './config/logger'

const app = express()

app.get('/', (req, res) => {
  res.json({ message: 'Hello There!' })
})

app.listen(process.env.PORT, () => {
  logger.info(`Serverrr is running on port ${process.env.PORT}!`)
})
