const { v4: uuidv4 } = require('uuid');
const user = require('./user');
const item = require('./item');
const category = require('./category');
const address = require('./address');

const resolvers = {
  Query: {
    get_user_by_email: user.get_user_by_email,
    get_users: user.get_users,
    get_item_by_Id: item.get_item_by_Id, //necessary?
    get_items: item.get_items,
    get_category: category.get_category,  //necessary?
    get_categories: category.get_categories,
    get_address_by_userId: address.get_address_by_userId,
    get_addresses: address.get_addresses,
  },

  User: {
    item: user.get_items,
    address: user.get_address
  },

  Item: {
    user: item.get_user_by_item
  },

  Category: {
    item: category.get_items
  },

  Address: {
    user: address.get_user_by_address
  },

  Mutation: {
    create_user: user.create_user,
    update_user: user.update_user,
    delete_user: user.delete_user,
    create_item: item.create_item,
    delete_item_by_id: item.delete_item_by_id,
    update_item: item.update_item,
    create_category: category.create_category,
    delete_category: category.delete_category,
    update_category: category.update_category,
    create_address: address.create_address,
    update_address: address.update_address,
  }
};

module.exports = resolvers;
