module.exports = `
type User {
    id: String!
    firstName: String
    lastName: String
    password: String!
    email: String!
    phoneNumber: Int
    item: [Item!]
  }

  type Item {
    id: String!
    name: String!
    minPrice: Int
    description: String!
    user: User!
  }`;