exports.get_category_by_Id = async (_, { id }, { models }) => {
  const category = await models.categories.findByPk(id);
  return category;
};

exports.get_categories = async (_, __, { models }) => {
  const categories = await models.categories.findAll();
  return categories;
};

exports.get_items = async (category, _, { models }) => {
  const items = await models.items.findAll({ where: { categoryId: category.id } });
  return items;
};

exports.create_category = async (_, { name }, { models }) => {
  const upperName = name.toUpperCase();
  const createdCategory = await models.categories.create({ name: upperName });
  return createdCategory;
};
exports.delete_category = async (_, { id }, { models }) => {
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
exports.update_category = async (_, { id, name }, { models }) => {
  const dbCategory = await models.categories.findOne({
    where: {
      id: id,
    }
  });
  dbCategory.name = name.toUpperCase();
  await dbCategory.save();
  return dbCategory;
};