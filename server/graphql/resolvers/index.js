const { v4: uuidv4 } = require('uuid');
const user = require('./user');
const item = require('./item');

const resolvers = {
  Query: {
    user: user.user,
    users: user.users,
    item: item.item,
    items: item.items,
  },

  User: {
    item: user.get_items
  },

  Item: {
    user: item.get_user
  },

  Mutation: {
    createUser: user.createUser,
    createItem: item.createItem,
    deleteItem: item.deleteItem
  }
};

module.exports = resolvers;
