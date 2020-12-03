module.exports = `
type User {
  id: String!
  firstName: String
  lastName: String
  password: String!
  email: String!
  phoneNumber: Int
  item: [Item!]
  address: Address
  }
extend type Query {
    me: User
    get_user_by_email(email: String!): User!
    get_users: [User]
}
extend type Mutation {
  create_user(email: String!,password: String!,firstName: String, lastName: String, phoneNumber:Int): User!
  }
`;