'use strict';
const { users, items } = require('../models/db');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    me: users[0]
  }
});

