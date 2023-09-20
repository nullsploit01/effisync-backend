import mongoose from 'mongoose'

import { IUser } from '../interface/IUser'
import { passwordService } from '../services/auth/password.service'

interface IUserDocument extends mongoose.Document {
  name: string
  email: string
  password?: string
  googleId?: string
  avatar?: string
  createdAt?: Date
  updatedAt?: Date
}

interface IUserModel extends mongoose.Model<IUserDocument> {
  build(attrs: IUser): IUserDocument
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    toJSON: {
      transform(_, ret) {
        delete ret._id
        delete ret.password
        delete ret.__v
      }
    }
  }
)

// hash the pasword before saving email/password users
userSchema.pre<IUserDocument>('save', async function (done) {
  try {
    const password = this.isModified('password') ? this.get('password') : null

    if (password) {
      const hashed = await passwordService.toHash(password)
      this.set('password', hashed)
    }
    done()
  } catch (err: any) {
    throw new Error(err.message)
  }
})

// Update the 'updatedAt' field before saving
userSchema.pre<IUserDocument>('save', function (done) {
  this.updatedAt = new Date()
  done()
})

userSchema.statics.build = (attrs: IUser) => {
  return new User(attrs)
}

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema)
export { User }
