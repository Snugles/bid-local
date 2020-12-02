module.exports = `
type Item {
  id: String!
  name: String!
  minPrice: Int
  description: String
  user: User!
  category: Category!
}

extend type Query {
  item(id: ID!): Item
  items: [Item!]
}

extend type Mutation {
  createItem(name: String!, minPrice: Int!, description: String, userId: String!, categoryId: String!): Item!
  deleteItem(id: ID!): Boolean!
  } `;