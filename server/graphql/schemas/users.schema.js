module.exports = `
type User {
    id: ID!
    username: String!
    item: [Item!]
  }
type Query {
    me: User
    user(id: ID!): User
    users: [User!]
}
type Mutation {
    createUser(user: String!): User!
  }
`;