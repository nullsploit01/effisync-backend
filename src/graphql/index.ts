import { ApolloServer } from '@apollo/server'
import { typeDefs } from './typedefs'

export const resolvers = {
  Query: {
    hello: () => 'world'
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers
})

export { server }
