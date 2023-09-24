export interface IUser {
  name: string
  email: string
  password?: string
  googleId?: string
  avatar?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IUserPayload {
  id: string
  email: string
  sessionToken: string
}
