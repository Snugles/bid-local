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

input AddressUpdate {
  firstLineAddress: String!
  secondLineAddress: String
  city: String!
  postcode: String!
  country: String!
}

extend type Query {
  get_address_by_userId(userId: String!): Address
  get_addresses: [Address]
}

extend type Mutation {
  create_address(
    userId:String!
    address:AddressUpdate!
    ): Address

  update_address(
    addressId:String!
    address:AddressUpdate!
    ): Address!
  }
`;