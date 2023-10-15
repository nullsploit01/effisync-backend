import { randomBytes } from 'crypto'

export const generateRandomId = () => {
  return randomBytes(24).toString('hex')
}
