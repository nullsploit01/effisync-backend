import { ApolloServer } from '@apollo/server'

import { userResolvers } from './User/resolver'
import { userTypeDefs } from './User/schema'

export const typeDefs = `#graphql
  type Query {
    hello: String
  }
`

export const resolvers = {
  Query: {
    hello: () => 'Sup world'
  }
}
const server = new ApolloServer({
  typeDefs: userTypeDefs,
  resolvers: userResolvers
})

export { server }
