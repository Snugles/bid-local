exports.category = async (_, { id }, { models }) => {
  const category = await models.categories.findOne({ id: id });
  return category;
};

exports.categories = async (_, __, { models }) => {
  const categories = await models.categories.findAll();
  return categories;
};

exports.get_items = async (category, _, { models }) => {
  const item = await models.items.findOne({ id: item.categoryId });
  return item;
};

exports.createCategory = async (_, { name }, { models }) => {
  const createdCategory = await models.categories.create({name});
  return createdCategory;
};
exports.deleteCategory = async (_, { id }, { models }) => {
  const destroyed = await models.categories.destroy({
    where: {
      id: id
    }
  });
  if (!destroyed) {
    return false;
  }
  return true;
};