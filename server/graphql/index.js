'use strict';

const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const schemas = require('./schemas');
const resolvers = require('./resolvers');
const models = require('../models');


const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError( //token will fail if invalid or expired
        'Your session expired. Sign in again.',
      );
    }
  }
};


const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req); //user can be defined or undefined? either way, server continues.
    return {
      models,
      me,
      secret: process.env.SECRET,
    };
  }
});

module.exports = server;


