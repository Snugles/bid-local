exports.get_item_by_Id = async (_, { id }, { models }) => {
  const item = await models.items.findOne({ wherer: { id: id }});
  return item;
};

exports.get_items = async (_, __, { models }) => {
  const items = await models.items.findAll();
  return items;
};

exports.get_user_by_item = async (item, _, { models }) => {
  const user = await models.users.findOne({ where: { id: item.userId }});
  return user;
};

exports.create_item = async (_, { name, minPrice, description,userId, categoryId }, { models }) => {
  const item = {
    name,
    minPrice,
    description,
    userId, //make dynamic
    categoryId, //make dynamic
  };
  const createdItem = await models.items.create(item);

  return createdItem;
};
exports.delete_item_by_id = async (_, { id }, { models }) => {
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