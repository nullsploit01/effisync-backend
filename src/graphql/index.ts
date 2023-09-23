import { buildSubgraphSchema } from '@apollo/subgraph'

import { taskResolvers } from './Task/resolver'
import { taskTypeDefs } from './Task/schema'
import { userResolvers } from './User/resolver'
import { userTypeDefs } from './User/schema'

export const schema = buildSubgraphSchema([
  { typeDefs: userTypeDefs, resolvers: userResolvers },
  { typeDefs: taskTypeDefs, resolvers: taskResolvers }
])
