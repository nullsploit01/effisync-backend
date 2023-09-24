import gql from 'graphql-tag'

export const taskTypeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    createdAt: String
    updatedAt: String
    tags: [String!]
    reminderId: ID
    status: String!
  }

  extend type Mutation {
    createTask(task: TaskInput!): Task!
  }

  input TaskInput {
    title: String!
    description: String
    tags: [String!]
    reminderId: ID
  }
`
