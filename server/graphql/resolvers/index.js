const user = require('./user');
const item = require('./item');
const category = require('./category');
const address = require('./address');
const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated, isItemOwner, isAddressOwner } = require('./authorization');
const pubsub = require('../utils/PubSub');

const resolvers = {
  Query: {
    get_users: user.get_users, //to deprecate/block/admin only
    get_user_info: combineResolvers(isAuthenticated, user.get_user_info),
    get_item_by_Id: item.get_item_by_Id, //OK
    get_items: item.get_items, //OK - needs protecting
    get_categories: category.get_categories, //OK
    get_address: combineResolvers(isAddressOwner, address.get_address), //necessary?
    //get_addresses: address.get_addresses, //to deprecate/block/admin only
    won_item_list: combineResolvers(isAuthenticated, item.won_item_list),
  },

  User: {
    item: user.get_items,
    address: user.get_address
  },

  Item: {
    user: item.get_user_by_item,  // to check if necessary, security risk?
    category: item.get_category_by_Item
  },

  Category: {
    item: category.get_items
  },

  Address: {
    user: address.get_user_by_address // to check if necessary, security risk?
  },

  Mutation: {
    //create_user: user.create_user, //to deprecate/block/admin only
    update_user: combineResolvers(isAuthenticated, user.update_user), //OK
    //delete_user: user.delete_user, //to deprecate/block/admin only
    sign_up: user.sign_up, //OK
    sign_in: user.sign_in, //OK
    create_item: combineResolvers(isAuthenticated, item.create_item), //OK
    delete_item_by_id: combineResolvers(isItemOwner, item.delete_item_by_id),
    update_item: combineResolvers(isItemOwner, item.update_item), //OK
    create_category: category.create_category, //to deprecate/block/admin only
    delete_category: category.delete_category, //to deprecate/block/admin only
    update_category: category.update_category, //to deprecate/block/admin only
    create_address: combineResolvers(isAuthenticated, address.create_address),
    update_address: combineResolvers(isAddressOwner, address.update_address),
    place_a_bid: combineResolvers(isAuthenticated, item.place_a_bid),
  },
  Subscription: {
    bidPlaced: {
      subscribe: () => pubsub.asyncIterator(['bidPlaced'])
    }
  }
};

module.exports = resolvers;
