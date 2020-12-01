const { gql } = require('apollo-server-express');

// const usersSchema = require('./users.schema');
// const itemsSchema = require('./items.schema');

const query = require('./query.schema');
const mutations = require('./mutations.schema');
const types = require('./types.schema');

module.exports = gql`
  ${types}
  ${mutations}
  ${query}
`;

// module.exports = gql`
//   type Query {
//     _: Boolean
//   }
 
//   type Mutation {
//     _: Boolean
//   }
//   ${usersSchema}
//   ${itemsSchema}
// `;
