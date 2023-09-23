import { Task } from '../../models/task'
import { ICreateTask } from './interface'

class TaskService {
  createTask: ICreateTask = async (task) => {
    const createdTask = Task.build(task)
    await createdTask.save()

    return createdTask
  }

  updateTask = async () => {}

  deleteTask = async () => {}

  getTask = async () => {}

  getTasks = async () => {}
}

const taskService = new TaskService()
export { taskService }
