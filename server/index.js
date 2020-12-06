'use strict';

const cors = require('cors');
const app = require('express')();
const { ApolloServer } = require('apollo-server-express');
const server = require('./graphql');
const db = require('./models/index');


app.use(cors());

const PORT = process.env.PORT || 8000;

server.applyMiddleware({ app, path: '/graphql' });


(async () => {
  try {
    db.sequelize.sync().then( async () => {
      app.listen({ port: 8000 }, () => {
        console.log(`Server is running at ${PORT}`);
      });
    });
  } catch (error) {
    console.log('Error connecting to db', error);
  }
})();
