const { v4: uuidv4}  = require('uuid');

module.exports =  {
  Query: {
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
  Mutation: {
    createItem: (parent, { name }, {me, models}) => {
      let id = uuidv4();
      console.log(id);
      const item = {
        id,
        name,
        // userID: me.id,
      }
      // models.items[id] = item;
      // model.users[me.id].itemIds.push(id);

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
}