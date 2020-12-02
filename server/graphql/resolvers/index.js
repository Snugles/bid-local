const { v4: uuidv4 } = require('uuid');
const user = require('./user');
const item = require('./item');
const category = require('./category');
const address = require('./address');

const resolvers = {
  Query: {
    user: user.user,
    users: user.users,
    item: item.item,
    items: item.items,
    category: category.category,
    categories: category.categories,
    address: address.address,
  },

  User: {
    item: user.get_items,
    address: user.get_address
  },

  Item: {
    user: item.get_user
  },

  Category: {
    item: category.get_items
  },

  Address: {
    user: address.get_user
  },

  Mutation: {
    createUser: user.createUser,
    createItem: item.createItem,
    deleteItem: item.deleteItem,
    createCategory: category.createCategory,
    deleteCategory: category.deleteCategory,
    createAddress: address.createAddress
  }
};

module.exports = resolvers;
