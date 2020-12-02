module.exports = `
type Category {
  id: String!
  name: String!
  item: [Item]
}

extend type Query {
  get_category(id: ID!): Category
  get_categories: [Category]
}

extend type Mutation {
  createCategory(name: String!): Category!
  deleteCategory(id: ID!): Boolean!
  } `;