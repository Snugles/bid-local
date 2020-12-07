const { ForbiddenError } = require('apollo-server');
const { skip } = require('graphql-resolvers');

module.exports.isAuthenticated = (_, __, { me }) =>{
  console.log('Authenticating...');
  return me ? skip : new ForbiddenError('Not authenticated as user.');
};