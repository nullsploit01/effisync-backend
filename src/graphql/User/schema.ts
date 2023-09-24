import gql from 'graphql-tag'

export const userTypeDefs = gql`
  type User {
    email: ID!
    name: String!
    googleId: String
    avatar: String
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    userProfile: User!
  }

  extend type Mutation {
    login(email: ID!, password: String!): UserPayload!
    register(name: String!, email: ID!, password: String!): UserPayload!
    logout: Boolean!
  }

  type UserPayload {
    user: User!
    token: String!
  }
`
