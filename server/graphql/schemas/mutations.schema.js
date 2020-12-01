module.exports = `
type Mutation {
    createUser(email: String!,password: String!,firstName: String, lastName: String, phoneNumber:Int): User!
    createItem(name: String!): Item!
    deleteItem(id: ID!): Boolean!
  }`;