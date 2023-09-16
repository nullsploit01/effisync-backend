import { ApolloServer } from '@apollo/server'

import { typeDefs } from './typedefs'

export const resolvers = {
  Query: {
    hello: () => 'Sup world'
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers
})

export { server }
