import { ApolloServer } from '@apollo/server'
import { buildSubgraphSchema } from '@apollo/subgraph'

import { IUserPayload } from '../interface/IUser'
import { taskResolvers } from './Task/resolver'
import { taskTypeDefs } from './Task/schema'
import { userResolvers } from './User/resolver'
import { userTypeDefs } from './User/schema'

interface IContext {
  user: IUserPayload | null
}

const schema = buildSubgraphSchema([
  { typeDefs: userTypeDefs, resolvers: userResolvers },
  { typeDefs: taskTypeDefs, resolvers: taskResolvers }
])

export const server = new ApolloServer<IContext>({
  schema
})
