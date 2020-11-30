'use strict';

const cors = require('cors');
const app = require('express')();
const { ApolloServer } = require('apollo-server-express');
const server = require('./graphql');

 
app.use(cors());

const PORT = process.env.PORT || 3000;

server.applyMiddleware({ app, path: '/graphql' });
 
app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});



// (async() => {
//   try {
//     await db.sequelize.sync();
//     app.listen(PORT, () => {
//       console.log(`Server is running at ${PORT}`)
//     });
//   } catch (error) {
//     console.log('Error connecting to db', error);
//   }
// })();
