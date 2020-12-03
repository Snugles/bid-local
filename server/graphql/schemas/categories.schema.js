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
  create_category(name: String!): Category
  delete_category(id: ID!): Boolean!
  update_category(id: ID!,name: String!): Category!
  } `;