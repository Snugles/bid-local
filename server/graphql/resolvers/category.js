exports.get_category = async (_, { id }, { models }) => {
  const category = await models.categories.findOne({ where: { id: id }});
  return category;
};

exports.get_categories = async (_, __, { models }) => {
  const categories = await models.categories.findAll();
  console.log('returning all categories:',categories);
  return categories;
};

exports.get_items = async (category, _, { models }) => {
  const items = await models.items.findAll( { where: { id: item.categoryId }});
  return items;
};

exports.create_category = async (_, { name }, { models }) => {
  console.log('Received CATEGORY:',name);
  const upperName = name.toUpperCase();
  console.log('changed CATEGORY:',upperName);
  const createdCategory = await models.categories.create({name: upperName});
  console.log('CREATED CATEGORY:',createdCategory);
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