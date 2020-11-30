const { users, items } = require('../../models/db');
const { uuid } = require('uuid');

const resolvers = {
  Query: {
    me: () => {
      return me;
    },
    user: (parent, { id }) => {
      return users[id]
    },
    users: () => {
      return Object.values(users);
    },
    item: (parent, { id }) => {
      return items[id]
    },
    items: () => {
      return Object.values(items);
    }
  },
  Item: {
    user: item => {
      return users[item.userID];
    }
  },
  User: {
    item: user => {
      return Object.values(items).filter(item => item.userID === user.id)
    }
  },
  Mutation: {
    createItem: (parent, { name }, {me}) => {
      const id = uuid();
      const item = {
        id,
        name,
        userID: me.id
      }
      items[id] = item;
      users[me.id] = itemIds.push(id);

      return item;
    }
  }
};

module.exports = resolvers;
