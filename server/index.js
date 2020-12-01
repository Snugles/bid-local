'use strict';

const cors = require('cors');
const app = require('express')();
const { ApolloServer } = require('apollo-server-express');
const server = require('./graphql');
const db = require('./models/index');


app.use(cors());

const PORT = process.env.PORT || 3000;

server.applyMiddleware({ app, path: '/graphql' });

// app.listen({ port: 8000 }, () => {
//   console.log('Apollo Server on http://localhost:8000/graphql');
// });



 (async() => {
   try {
     await db.sequelize.sync();
     app.listen({ port: 8000 }, () => {
       console.log(`Server is running at ${8000}`)
     });
   } catch (error) {
     console.log('Error connecting to db', error);
   }
 })();
