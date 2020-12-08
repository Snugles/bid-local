const { ForbiddenError } = require('apollo-server');
const { skip } = require('graphql-resolvers');

module.exports.isItemOwner = async (_,{ itemId },{ models, me }) => {
  try {
    const item = await models.items.findByPk(itemId, { raw: true });
    if (!item) throw new Error('Couldn\'t find Item');
    if (!me || item.userId !== me.id) {
      throw new ForbiddenError('Not Authorized. User not the owner of this resource.');
    }
    return skip;
  } catch (e) {
    return e;
  }
};

module.exports.isAddressOwner = async (_,{ addressId },{ models, me }) => {
  try {
    const address = await models.addresses.findByPk(addressId, { raw: true });
    if (!address) throw new Error('Couldn\'t find address');
    if (!me || address.userId !== me.id) {
      throw new ForbiddenError('Not Authorized. User not the owner of this resource.');
    }
    return skip;
  } catch (e) {
    return e;
  }
};

module.exports.isAuthenticated = (_, __, { me }) =>{
  return me ? skip : new ForbiddenError('Not Authorized. Please log in');
};