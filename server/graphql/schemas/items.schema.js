module.exports = `
type Item {
  id: String!
  name: String!
  user: User
}

extend type Query {
  item(id: ID!): Item
  items: [Item!]
}

extend type Mutation {
    createItem(name: String!): Item!
    deleteItem(id: ID!): Boolean!
  } `;