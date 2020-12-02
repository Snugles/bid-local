module.exports = `
type Address {
  id: String!
  firstLineAddress: String
  secndLineAddress: String
  city: String!
  postcode: String!
  country: String!
  user: User!
  }
extend type Query {
    address(email: String!): Address
}
extend type Mutation {
  createAddress(firstLineAddress: String!,secondLineAddress: String!,city: String, postcode: String, country: String, userId: String): Address!
  }
`;