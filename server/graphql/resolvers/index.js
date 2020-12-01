const { v4: uuidv4 } = require('uuid');



const resolvers = {
  Query: {
    // me: () => {
    //   return me;
    // },
    user: async (_, { id }, { models }) => {
      const user = await models.users.findOne({id:id})
      return user
    },
    users: async (_, __, { models }) => {
      const users = await models.users.findAll()
      return users
    },
    item: async(_, { id }, { models }) => {
      const item = await models.items.findOne({id:id})
      return item
    },
    items: async(parent, agrs, { models }) => {
      const items = await models.items.findAll();
      return items
    }
  },
  Item: {
    user: (item, args, { models }) => {
      return models.users[item.userID];
    }
  },
  User: {
    item: (user, args, { models }) => {
      return Object.values(models.items).filter(item => item.userID === user.id)
    }
  },


  Mutation: {

    createUser: async (_, { user }, { models }) => {
      const createdUser = await models.users.create({ id: 1, username: user });
      return createdUser;
    },

    createItem: async (_, { name }, { models }) => {
      //let id = uuidv4();
      //console.log(id);
      const item = {
        //id,
        name,
        // userID: me.id,
      }
      const createdItem = await models.items.create(item);

      return createdItem;
    },
    deleteItem: async (_, { id }, { models }) => {
      const destroyed = await models.items.destroy({
        where: {
          id:id
        }
      })
      if (!destroyed) {
        return false;
      }
      return true;
    }
  }
};

module.exports = resolvers;
