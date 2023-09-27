import { NotFoundError } from '../../errors/not-found.error'
import { Task } from '../../models/task'
import { ICreateTask, IGetTask } from './interface'

class TaskService {
  createTask: ICreateTask = async (task) => {
    const createdTask = Task.build(task)
    await createdTask.save()

    return createdTask
  }

  updateTask = async () => {}

  deleteTask = async () => {}

  getTask: IGetTask = async (id) => {
    const task = await Task.findOne({ id })

    if (!task) {
      throw new NotFoundError('Task not found')
    }

    return task
  }

  getTasks = async () => {}
}

const taskService = new TaskService()
export { taskService }
