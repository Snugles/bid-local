const { gql } = require('apollo-server-express');

const usersSchema = require('./users.schema');
const itemsSchema = require('./items.schema');
const categoriesSchema = require('./categories.schema');
const addressesSchema = require('./addresses.schema');
const imageSchema = require('./image.schema');


module.exports = gql`
   type Query {
     _: Boolean
   }

   type Mutation {
     _: Boolean
   }

   type Subscription {
     _: Boolean
   }
   ${usersSchema}
   ${itemsSchema}
   ${categoriesSchema}
   ${addressesSchema}
   ${imageSchema}
 `;
