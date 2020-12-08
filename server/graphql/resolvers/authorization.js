const { ForbiddenError } = require('apollo-server');
const { skip } = require('graphql-resolvers');

module.exports.isItemOwner = async (_,{ itemId },{ models, me }) => {
  const item = await models.items.findByPk(itemId, { raw: true });
  console.log('Checking is Owner of...',item,itemId);
  if (!me || item.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }
  return skip;
};

module.exports.isAddressOwner = async (_,{ addressId },{ models, me }) => {
  const address = await models.addresses.findByPk(addressId, { raw: true });
  console.log('Checking is Owner of...',address,addressId);
  if (!me || address.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }
  return skip;
};

module.exports.isAuthenticated = (_, __, { me }) =>{
  console.log('Authenticating...');
  return me ? skip : new ForbiddenError('Not authenticated as user.');
};