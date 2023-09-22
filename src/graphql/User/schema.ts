export const userTypeDefs = `#graphql
type User {
    email: ID!
    name: String!
    googleId: String
    avatar: String
    createdAt: String
    updatedAt: String
}

type Query {
    userProfile(email: ID!): User!
}

type Mutation {
    login(email: ID!, password: String!): User!
    register(name: String!, email: ID!, password: String!): User!
}
`
