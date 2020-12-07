module.exports = `
type Item {
  id: String!
  name: String!
  minPrice: Int!
  description: String
  picUrl1: String
  picUrl2: String
  picUrl3: String
  auctionEnd: String
  firstBidder: String
  secondBidder: String
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
  auctionEnd: String
  categoryId: ID
}

input BidUpdate {
  biddingPrice: Int!
  userId: ID!
}

extend type Query {
  get_item_by_Id(id: ID!): Item
  get_items: [Item]
}

extend type Mutation {
  create_item(userId: ID!,item: ItemUpdate!): Item!
  delete_item_by_id(id: ID!): Boolean!
  update_item(itemId:ID!,item:ItemUpdate!): Item!
  place_a_bid(itemId:ID!,bid:BidUpdate!): Item!
}`;