const { ForbiddenError } = require('apollo-server');
const { skip } = require('graphql-resolvers');

module.exports.isItemOwner = async (_,{ itemId },{ models, me }) => {
  const item = await models.items.findByPk(itemId, { raw: true });
  if (!me || item.userId !== me.id) {
    throw new ForbiddenError('Not Authorized. User not the owner of this resource.');
  }
  return skip;
};

module.exports.isAddressOwner = async (_,{ addressId },{ models, me }) => {
  const address = await models.addresses.findByPk(addressId, { raw: true });
  if (!me || address.userId !== me.id) {
    throw new ForbiddenError('Not Authorized. User not the owner of this resource.');
  }
  return skip;
};

module.exports.isAuthenticated = (_, __, { me }) =>{
  return me ? skip : new ForbiddenError('Not Authorized. Please log in');
};