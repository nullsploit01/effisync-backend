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
    updateTask(id: ID!, task: TaskInput!): Task!
    deleteTask(id: ID!): Boolean!
  }

  extend type Query {
    getTask(id: ID!): Task!
    getTasks: [Task!]!
  }

  input TaskInput {
    title: String!
    description: String
    tags: [String!]
    reminderId: ID
  }
`
