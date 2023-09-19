export const userTypeDefs = `#graphql
type User {
    email: ID!
    name: String!
    password: String
    googleId: String
    avatar: String
    createdAt: String
    updatedAt: String
}

type Query {
    login(email: ID!, password: String!): User!
}
`
