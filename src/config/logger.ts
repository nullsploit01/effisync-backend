import winston, { createLogger, format } from 'winston'

export const logger = createLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: format.combine(
        format.colorize({ all: true }), // Enable colorization
        format.simple() // Simple log format
      )
    })
  )
}
