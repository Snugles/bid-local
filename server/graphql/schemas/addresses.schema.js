module.exports = `
type Address {
  id: ID!
  firstLineAddress: String!
  secondLineAddress: String
  city: String!
  postcode: String!
  country: String!
  user: User!
}

input AddressUpdate {
  firstLineAddress: String!
  secondLineAddress: String
  city: String!
  postcode: String!
  country: String!
}

extend type Query {
  get_address_by_userId(userId: ID!): Address
  get_addresses: [Address]
}

extend type Mutation {
  create_address(
    address:AddressUpdate!
    ): Address

  update_address(
    addressId:ID!
    address:AddressUpdate!
    ): Address!
  }
`;