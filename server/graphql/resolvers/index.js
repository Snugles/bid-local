const { v4: uuidv4 } = require('uuid');



const resolvers = {
  Query: {
    me: () => {
      return me;
    },
    user: (parent, { id }, { models }) => {
      return models.users[id]
    },
    users: async (_, __, { models }) => {
      console.log(models)
      const users = await models.users.find()
      return users
    },
    item: (parent, { id }, { models }) => {
      return models.items[id]
    },
    items: (parent, agrs, { models }) => {
      return Object.values(models.items);
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


  // async createCatcall(_, { catcall }) {
  //   const { type, geometry, properties} = catcall;
  //   const createdCatcall = await Catcall.create({ type, geometry, properties });
  //   return createdCatcall;
  // },


  Mutation: {

    createUser: async (_, { user }, { models }) => {
      const createdUser = await models.users.create({ id: 1, username: user });
      return createdUser;
    },

    createItem: (parent, { name }, { me, models }) => {
      let id = uuidv4();
      console.log(id);
      const item = {
        id,
        name,
        userID: me.id,
      }
      models.items[id] = item;
      models.users[me.id].itemIds.push(id);

      return item;
    },
    deleteItem: (parent, { id }) => {
      let { [id]: item, ...otherItems } = items;
      if (!item) {
        return false;
      }
      model.items = otherItems;
      return true;

    }
  }
};

module.exports = resolvers;
