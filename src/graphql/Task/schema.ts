export const taskTypeDefs = `#graphql
type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
    createdAt: String
    updatedAt: String
    tags: [String!]
    reminderId: ID
    status: String!
}

type Query {
    tasks: [Task!]!
    task(id: ID!): Task!
}
`
