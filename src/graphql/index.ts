import { buildSubgraphSchema } from '@apollo/subgraph'

import { userResolvers } from './User/resolver'
import { userTypeDefs } from './User/schema'

export const schema = buildSubgraphSchema([{ typeDefs: userTypeDefs, resolvers: userResolvers }])
