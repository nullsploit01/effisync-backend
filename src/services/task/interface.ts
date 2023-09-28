import { ITask } from '../../interface/ITask'
import { IUserPayload } from '../../interface/IUser'

export interface ICreateTask {
  (task: ITask): Promise<ITask>
}

export interface IUpdateTask {
  (id: string, task: ITask): Promise<ITask>
}

export interface IDeleteTask {
  (id: string, user: IUserPayload): Promise<boolean>
}

export interface IGetTask {
  (id: string, user: IUserPayload): Promise<ITask>
}

export interface IGetTasks {
  (user: IUserPayload): Promise<ITask[]>
}
