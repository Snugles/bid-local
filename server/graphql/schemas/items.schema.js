module.exports = `
type Item {
  id: String!
  name: String!
  minPrice: Int!
  description: String
  user: User!
  category: Category
}

input ItemCreate {
  name: String!
  minPrice: Int!
  description: String
  userId: String!
  categoryId: String
}

input ItemUpdate {
  name: String!
  minPrice: Int!
  description: String
  categoryId: String!
}

extend type Query {
  get_item_by_Id(id: ID!): Item
  get_items: [Item]
}

extend type Mutation {
  create_item(userId: String!, item: ItemCreate!): Item!
  delete_item_by_id(id: ID!): Boolean!
  update_item(itemId:String!,item:ItemUpdate!): Item!
}

  `;