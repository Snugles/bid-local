module.exports = `
type Mutation {
    createItem(name: String!): Item!
    deleteItem(id: ID!): Boolean!
  }`;