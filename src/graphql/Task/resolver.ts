import { taskMutations } from './mutation'
import { taskQueries } from './query'

export const taskResolvers = {
  ...taskMutations,
  ...taskQueries
}
