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
}
extend type Mutation {
<<<<<<< HEAD
  create_user(email: String!,password: String!,firstName: String, lastName: String, phoneNumber:String): User!
=======
  create_user(user: UserUpdate!): User
>>>>>>> refactorMutation
  }
`;