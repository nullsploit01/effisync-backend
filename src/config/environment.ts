import 'dotenv/config'

if (!process.env.MONGODB_CONNECTION_STRING)
  throw new Error('MONGODB_CONNECTION_STRING is not defined')

export const environment = {
  isProdEnv: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT) || 4000,
  mongoDbConnectionString: process.env.MONGODB_CONNECTION_STRING
}
