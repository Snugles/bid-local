'use strict';

const { ApolloServer } = require('apollo-server-express');
const schemas = require('./schemas');
const resolvers = require('./resolvers');
const models = require('../models');

module.exports = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: {
    models,
    me: models.users[1]
  }
});

