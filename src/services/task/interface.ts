import { ITask } from '../../interface/ITask'

export interface ICreateTask {
  (task: ITask): Promise<ITask>
}

export interface IUpdateTask {
  (id: string, task: ITask): Promise<ITask>
}

export interface IDeleteTask {
  (id: string): Promise<ITask>
}

export interface IGetTask {
  (id: string): Promise<ITask>
}

export interface IGetTasks {
  (userId: string): Promise<ITask[]>
}
