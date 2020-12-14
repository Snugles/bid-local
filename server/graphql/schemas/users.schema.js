/**
 * PASSWORD FIELDS TO BE REMOVED, we never want to return
 * the password!
 * Also evaluate if create user needs to be deprecated
 * or if sign up is necessary with create user available
 */

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

type Token {
  token: String!
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
  get_user_info: User
}
extend type Mutation {
  update_user(user:UserUpdate!): User!
  delete_user(userId:ID!): Boolean!
  sign_up(user: UserUpdate!): Token!
  sign_in(email: String!,password: String!): Token!
}
`;