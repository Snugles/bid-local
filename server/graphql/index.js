'use strict';

const { ApolloServer } = require('apollo-server-express');
const schemas = require('./schemas');
const resolvers = require('./resolvers');
const models = require('../models');


let newLogin;
(async () => {
  newLogin = await models.users.findByLogin('user@user.com');
})();


const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async () => ({
    models,
    secret: process.env.SECRET,
    me: newLogin,//await models.users.findByLogin('user@user.com') //accessing an object for logged in user
  })
});

module.exports = server;


