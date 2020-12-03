module.exports = `
type Item {
  id: String!
  name: String!
  minPrice: Int!
  description: String
  user: User!
  category: Category
}

input ItemUpdate {
  name: String!
  minPrice: Int!
  description: String
  userId: String!
  categoryId: String!
}

extend type Query {
  get_item_by_Id(id: ID!): Item
  get_items: [Item]
}

extend type Mutation {
  create_item(item: ItemUpdate!, userId: String!, categoryId: String): Item!
  delete_item_by_id(id: ID!): Boolean!
}

  `;