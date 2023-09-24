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

      task.user = user
      const createdTask = await taskService.createTask(task)
      return createdTask
    }
  }
}
