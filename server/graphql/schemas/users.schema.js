module.exports = `
type User {
    id: ID!
    username: String!
    item: [Item!]
  }
extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]
}
extend type Mutation {
    createUser(user: String!): User!
  }
`;