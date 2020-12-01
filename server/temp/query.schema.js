module.exports = `
type Query {
    me: User
    user(id: ID!): User
    users: [User!]

    item(id: ID!): Item
    items: [Item!]
}`;