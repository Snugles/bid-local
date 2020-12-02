module.exports = `
type Category {
  id: String!
  name: String!
  item: Item!
}

extend type Query {
  category(id: ID!): Category
  categories: [Category!]
}

extend type Mutation {
  createCategory(name: String!): Category!
  deleteCategory(id: ID!): Boolean!
  } `;