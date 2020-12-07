module.exports = `
type User {
  id: ID!
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
  get_users: [User!]
  get_user_by_Id(id: ID!): User
}
extend type Mutation {
  create_user(user: UserUpdate!): User
  update_user(userId:ID!,user:UserUpdate!): User!
  delete_user(userId:ID!): Boolean!
}
`;