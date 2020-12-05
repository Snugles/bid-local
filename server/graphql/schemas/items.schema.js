module.exports = `
type Item {
  id: String!
  name: String!
  minPrice: Int!
  description: String
  picUrl: String
  user: User!
  category: Category
}

input ItemUpdate {
  name: String!
  minPrice: Int!
  description: String
  picUrl: String
  categoryId: String
}

extend type Query {
  get_item_by_Id(id: ID!): Item
  get_items: [Item]
}

extend type Mutation {
  create_item(userId: String!,item: ItemUpdate!): Item!
  delete_item_by_id(id: ID!): Boolean!
  update_item(itemId:String!,item:ItemUpdate!): Item!
}

`;