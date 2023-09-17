import { ApolloServer } from '@apollo/server'

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
  typeDefs,
  resolvers
})

export { server }
