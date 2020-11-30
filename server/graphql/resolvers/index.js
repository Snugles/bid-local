const { v4: uuidv4}  = require('uuid');

const resolvers = {
  Query: {
    me: () => {
      return me;
    },
    user: (parent, { id }, { models }) => {
      return users[id]
    },
    users: (parent, args, { models }) => {
      return Object.values(users);
    },
    item: (parent, { id }, { models }) => {
      return items[id]
    },
    items: (parent, agrs, { models }) => {
      return Object.values(items);
    }
  },
  Item: {
    user: (item, args, { models }) => {
      return users[item.userID];
    }
  },
  User: {
    item: user => {
      return Object.values(items).filter(item => item.userID === user.id)
    }
  },
  Mutation: {
    createItem: (parent, { name }, {me, models}) => {
      let id = uuidv4();
      console.log(id);
      const item = {
        id,
        name,
        userID: me.id,
      }
      models.items[id] = item;
      model.users[me.id].itemIds.push(id);

      return item;
    },
    deleteItem: (parent, { id }) => {
      let { [id]: item, ...otherItems } = items;
      if(!item) {
        return false;
      } 
      model.items = otherItems;
      return true;
      
    }
  }
};

module.exports = resolvers;
