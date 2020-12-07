'use strict';

const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const schemas = require('./schemas');
const resolvers = require('./resolvers');
const models = require('../models');
const jwt = require('jsonwebtoken');


const loggerPlugin = {

  // Fires whenever a GraphQL request is received from a client.
  requestDidStart (requestContext) {
    //console.log('Request started! Query:\n');
    //console.log(requestContext.request);
    return {
      didEncounterErrors (requestContext) {
        console.log(requestContext.errors);
      },

    };
  },
};


const getMe = async req => {
  //console.log('Received Headers',req.headers);
  const token = req.headers['x-token'];
  //console.log('Received Token:',token);
  //console.log('STARTING AUTH PROCESS:');
  if (token) {
    try {
      console.log('PROCESSING:');
      const response = await jwt.verify(token, process.env.SECRET);
      console.log('RESULT OF AUTHENTICATION:',response);
      return response;
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
  plugins: [
    loggerPlugin,
  ],
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


