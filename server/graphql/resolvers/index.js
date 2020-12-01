const { v4: uuidv4 } = require('uuid');
const user = require('./user');
const item = require('./item');

const resolvers = {
  Query: {
    user: user.user,
    users: user.users,

  },

  User: {
    item: user.get_items
  },

  Mutation: {
    createUser: user.createUser
  }
};

module.exports = resolvers;
