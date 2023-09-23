import { ITask } from '../../interface/ITask'
import { taskService } from '../../services/task/task.service'

export const taskMutations = {
  Mutation: {
    createTask: async (_: any, { task }: { task: ITask }) => {
      const createdTask = await taskService.createTask(task)
      return createdTask
    }
  }
}
