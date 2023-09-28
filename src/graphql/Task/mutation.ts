import { NotAuthorizedError } from '../../errors/not-authorized.error'
import { ITask } from '../../interface/ITask'
import { IUserPayload } from '../../interface/IUser'
import { taskService } from '../../services/task/task.service'

export const taskMutations = {
  Mutation: {
    createTask: async (
      _: any,
      { task }: { task: ITask },
      { user }: { user: IUserPayload | null }
    ) => {
      if (!user) throw new NotAuthorizedError()

      task.user = user.email
      const createdTask = await taskService.createTask(task)
      return createdTask
    },

    updateTask: async (
      _: any,
      { id, task }: { id: string; task: ITask },
      { user }: { user: IUserPayload | null }
    ) => {
      if (!user) throw new NotAuthorizedError()

      task.user = user.email
      const updatedTask = await taskService.updateTask(id, task)
      return updatedTask
    },

    deleteTask: async (_: any, { id }: { id: string }, { user }: { user: IUserPayload | null }) => {
      if (!user) throw new NotAuthorizedError()

      const deletedTask = await taskService.deleteTask(id, user)
      return deletedTask
    }
  }
}
