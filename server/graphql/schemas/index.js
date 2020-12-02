const { gql } = require('apollo-server-express');

const usersSchema = require('./users.schema');
const itemsSchema = require('./items.schema');

module.exports = gql`
   type Query {
     _: Boolean
   }

   type Mutation {
     _: Boolean
   }
   ${usersSchema}
   ${itemsSchema}
 `;
