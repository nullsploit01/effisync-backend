import { NotAuthorizedError } from '../../errors/not-authorized.error'
import { taskService } from '../../services/task/task.service'

export const taskQueries = {
  Query: {
    getTask: async (_: any, { id }: { id: string }, { user }: { user: any }) => {
      if (!user) throw new NotAuthorizedError('You are not authenticated')

      const task = await taskService.getTask(id, user)
      return task
    },

    getTasks: async (_: any, __: any, { user }: { user: any }) => {
      if (!user) throw new NotAuthorizedError('You are not authenticated')

      const tasks = await taskService.getTasks(user)
      return tasks
    }
  }
}
