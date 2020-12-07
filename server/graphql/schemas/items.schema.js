module.exports = `
type Item {
  id: String!
  name: String!
  minPrice: Int!
  description: String
  picUrl1: Upload
  picUrl2: Upload
  picUrl3: Upload
  user: User!
  category: Category
}

input ItemUpdate {
  name: String!
  minPrice: Int!
  description: String
  picUrl1: String
  picUrl2: String
  picUrl3: String
  categoryId: ID
}

extend type Query {
  get_item_by_Id(id: ID!): Item
  get_items: [Item]
}

extend type Mutation {
  create_item(userId: ID!,item: ItemUpdate!): Item!
  delete_item_by_id(id: ID!): Boolean!
  update_item(itemId:ID!,item:ItemUpdate!): Item!
}

`;