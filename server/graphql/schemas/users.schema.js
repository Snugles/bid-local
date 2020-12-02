module.exports = `
type User {
  id: String!
  firstName: String
  lastName: String
  password: String!
  email: String!
  phoneNumber: Int
  item: [Item!]
  address: Address!
  }
extend type Query {
    me: User
    user(email: String!): User
    users: [User!]
}
extend type Mutation {
  createUser(email: String!,password: String!,firstName: String, lastName: String, phoneNumber:Int): User!
  }
`;