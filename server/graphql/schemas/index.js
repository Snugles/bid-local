const { gql } = require('apollo-server-express');

const query = require('./query.schema');
const mutations = require('./mutations.schema');
const types = require('./types.schema');

module.exports = gql`
  ${types}
  ${mutations}
  ${query}
`;
