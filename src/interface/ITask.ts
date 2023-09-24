import { IUserPayload } from './IUser'

export interface ITask {
  id: string
  user: IUserPayload
  title: string
  status: keyof typeof TASK_STATUS
  description?: string
  createdAt?: Date
  updatedAt?: Date
  tags?: [string]
  reminderId?: string
}

export const TASK_STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
}
