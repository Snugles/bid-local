const { gql } = require('apollo-server-express');

const schemas = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]

    item(id: ID!): Item
    items: [Item!]
  }
 
  type User {
    id: ID!
    username: String!
    item: [Item!]
  }

  type Item {
    id: ID!
    name: String!
    user: User!
  }

  type Mutation {
    createItem(name: String!): Item!
  }
`;

module.exports = schemas;