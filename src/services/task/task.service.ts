import { NotFoundError } from '../../errors/not-found.error'
import { Task } from '../../models/task'
import { ICreateTask, IDeleteTask, IGetTask, IGetTasks, IUpdateTask } from './interface'

class TaskService {
  createTask: ICreateTask = async (task) => {
    const createdTask = Task.build(task)
    await createdTask.save()

    return createdTask
  }

  updateTask: IUpdateTask = async (id, task) => {
    const existingTask = await Task.findOne({ id })

    if (!existingTask) {
      throw new NotFoundError('Task not found')
    }

    const updatedTask = existingTask.set(task)
    await updatedTask.save()
    return updatedTask
  }

  deleteTask: IDeleteTask = async (id) => {
    const taskToDelete = await Task.findOne({ id })

    if (!taskToDelete) {
      throw new NotFoundError('Task not found')
    }

    await taskToDelete.deleteOne()
    return true
  }

  getTask: IGetTask = async (id) => {
    const task = await Task.findOne({ id })

    if (!task) {
      throw new NotFoundError('Task not found')
    }

    return task
  }

  getTasks: IGetTasks = async (user) => {
    const tasks = await Task.find({ user: user.email })
    return tasks
  }
}

const taskService = new TaskService()
export { taskService }
