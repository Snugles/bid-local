const { ForbiddenError } = require('apollo-server');
const { skip } = require('graphql-resolvers');

export const isItemOwner = async (_,{ id },{ models, me }) => {
  const item = await models.items.findByPk(id, { raw: true });

  if (item.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }
  return skip;
};

module.exports.isAuthenticated = (_, __, { me }) =>{
  console.log('Authenticating...');
  return me ? skip : new ForbiddenError('Not authenticated as user.');
};