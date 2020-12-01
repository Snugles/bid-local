exports.item = async (_, { id }, { models }) => {
  const item = await models.items.findOne({ id: id });
  return item;
};

exports.items = async (_, __, { models }) => {
  const items = await models.items.findAll();
  return items;
};

exports.get_user = async (item, _, { models }) => {
  const user = await models.users.findOne({ id: item.userId });
  return user;
};

exports.createItem = async (_, { name, minPrice, description,userId }, { models }) => {
  const item = {
    name,
    minPrice,
    description,
    userId: userId, //make dynamic
  };
  const createdItem = await models.items.create(item);

  return createdItem;
};
exports.deleteItem = async (_, { id }, { models }) => {
  const destroyed = await models.items.destroy({
    where: {
      id: id
    }
  });
  if (!destroyed) {
    return false;
  }
  return true;
};