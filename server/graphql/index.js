'use strict';

const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const schemas = require('./schemas');
const resolvers = require('./resolvers');
const models = require('../models');
const jwt = require('jsonwebtoken');

const getMe = async req => {
  let token = '';
  if (req) {
    token = req.headers['x-token'];
  }

  if (token) {
    try {
      const response = await jwt.verify(token, process.env.SECRET);
      const userFound = await models.users.findOne({ where: { email: response.email } });
      if (!userFound) throw new Error('No user found.');
      return response;
    } catch (e) {
      throw new AuthenticationError( //token will fail if invalid or expired
        `Your session expired. Sign in again. ${e.message}`,
      );
    }
  }
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req);
    return {
      models,
      me,
      secret: process.env.SECRET,
    };
  },
  subscriptions: {
    onConnect: () => console.log('Connected to websocket'),
  },
});

module.exports = server;