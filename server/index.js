'use strict';

const cors = require('cors');
const express = require('express');
const { createServer}  = require('http');
const { join } = require('path');
const { ApolloServer } = require('apollo-server-express');
const server = require('./graphql');
const db = require('./models/index');

const app = express();
app.use(cors());
app.use(express.static(join(__dirname, './uploads')));

const PORT = process.env.PORT || 8000;

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

//(async () => {
try {
  db.sequelize.sync().then(async () => {
    httpServer.listen({ port: 8000 }, () => {
      console.log(`Server is running at ${PORT}`);
    });
  });
} catch (error) {
  console.log('Error connecting to db', error);
}
//})();
