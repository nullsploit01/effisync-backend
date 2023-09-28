import mongoose from 'mongoose'

import { ITask, TASK_STATUS } from '../interface/ITask'

interface ITaskDocument extends mongoose.Document {
  id: string
  user: string
  title: string
  status: keyof typeof TASK_STATUS
  description?: string
  createdAt?: Date
  updatedAt?: Date
  tags?: [string]
  reminderId?: string
}

interface ITaskModel extends mongoose.Model<ITaskDocument> {
  build(attrs: ITask): ITaskDocument
}

const taskSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
    user: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, default: TASK_STATUS.TODO },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    tags: { type: [String] },
    reminderId: { type: String }
  },
  {
    toJSON: {
      transform(_, ret) {
        delete ret._id
        delete ret.__v
      }
    }
  }
)

// Update the 'updatedAt' field before saving
taskSchema.pre<ITaskDocument>('save', function (done) {
  this.updatedAt = new Date()
  done()
})

taskSchema.statics.build = (attrs: ITask) => {
  return new Task(attrs)
}

const Task = mongoose.model<ITaskDocument, ITaskModel>('Task', taskSchema)

export { Task }
