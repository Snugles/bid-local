module.exports = `
type Mutation {
    createUser(user: String!): User!
    createItem(name: String!): Item!
    deleteItem(id: ID!): Boolean!
  }`;