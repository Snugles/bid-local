const { v4: uuidv4 } = require('uuid');
const user = require('./user');
const item = require('./item');
const category = require('./category');

const resolvers = {
  Query: {
    user: user.user,
    users: user.users,
    item: item.item,
    items: item.items,
    category: category.category,
    categories: category.categories
  },

  User: {
    item: user.get_items
  },

  Item: {
    user: item.get_user
  },

  Category: {
    item: category.get_items
  },

  Mutation: {
    createUser: user.createUser,
    createItem: item.createItem,
    deleteItem: item.deleteItem,
    createCategory: category.createCategory,
    deleteCategory: category.deleteCategory
  }
};

module.exports = resolvers;
