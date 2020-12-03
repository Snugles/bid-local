exports.get_item_by_Id = async (_, { id }, { models }) => {
  const item = await models.items.findOne({ where: { id: id } });
  return item;
};

exports.get_items = async (_, __, { models }) => {
  const items = await models.items.findAll();
  return items;
};

exports.get_user_by_item = async (item, _, { models }) => {
  const user = await models.users.findOne({ where: { id: item.userId } });
  return user;
};

exports.create_item = async (_, { item }, { models }) => {
  const { name, minPrice, description, categoryId, userId } = item;
  try {
    const item = {
      name,
      minPrice,
      description,
      userId, //make dynamic
      categoryId, //make dynamic
    };
    const createdItem = await models.items.create(item);

    return createdItem;
  } catch (error) {
    console.error('Error', error);
  }

};
exports.delete_item_by_id = async (_, { id }, { models }) => {
  try {
    const destroyed = await models.items.destroy({
      where: {
        id: id
      }
    });
    if (!destroyed) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error', error);
  }
};

exports.update_item = async (_, { itemId, item }, { models }) => {
  let itemDB = await models.items.findOne({ where: { id: itemId } });
  itemDB = Object.assign(itemDB, item);
  await itemDB.save();
  return itemDB;
};