module.exports = `
type Address {
  id: String!
  firstLineAddress: String!
  secondLineAddress: String
  city: String!
  postcode: String!
  country: String!
  user: User!
  }
extend type Query {
  get_address_by_userId(userId: String!): Address
}
extend type Mutation {
  create_address(firstLineAddress: String!,secondLineAddress: String!,city: String, postcode: String, country: String, userId: String): Address!
  }
`;