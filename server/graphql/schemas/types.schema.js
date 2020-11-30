module.exports = `
type User {
    id: ID!
    username: String!
    item: [Item!]
  }

  type Item {
    id: ID!
    name: String!
    user: User!
  }`;