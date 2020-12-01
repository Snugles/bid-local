const { v4: uuidv4}  = require('uuid');

exports.item = async(_, { id }, { models }) => {
  const item = await models.items.findOne({id:id})
  return item
}

exports.items = async(_, agrs, { models }) => {
  const items = await models.items.findAll();
  return items
}

exports.get_user = async(item, _, { models }) => {
      const user = await models.users.findOne({id:item.userId})
      return user;
    }

exports.createItem = async (_, { name, minPrice, description }, { models }) => {
    const item = {
      name,
      minPrice,
      description,
      userId: "f4d75b33-a491-47f7-afff-b62db5b18c5c", //make dynamic
    }
    const createdItem = await models.items.create(item);

    return createdItem;
  }
exports.deleteItem = async (_, { id }, { models }) => {
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