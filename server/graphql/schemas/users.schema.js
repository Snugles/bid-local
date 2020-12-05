module.exports = `
type User {
  id: String!
  firstName: String
  lastName: String
  password: String!
  email: String!
  phoneNumber: String
  item: [Item!]
  address: Address
  }

input UserUpdate {
  firstName: String
  lastName: String
  password: String!
  email: String!
  phoneNumber: String
}
extend type Query {
  me: User
  get_user_by_email(email: String!): User
  get_users: [User]
  get_user_by_Id(id: String!): User
}
extend type Mutation {
  create_user(user: UserUpdate!): User
  update_user(userId:String!,user:UserUpdate!): User!
  delete_user(userId:String!): Boolean!
}
`;