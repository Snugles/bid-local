module.exports = `
type Item {
  id: String!
  name: String!
  user: User
}

type Query {
  item(id: ID!): Item
  items: [Item!]
}

type Mutation {
    createItem(name: String!): Item!
    deleteItem(id: ID!): Boolean!
  } `