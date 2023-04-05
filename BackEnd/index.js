require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers/resolvers');
const initDb = require('./models/initDb');

// Remove the pool variable

// Create an ApolloServer instance
const server = new ApolloServer({ typeDefs, resolvers });

// Create an Express app
const app = express();

// Wrap the server start and applyMiddleware calls within an async function
(async () => {
  await initDb();
  await server.start();
  server.applyMiddleware({ app });

  // Start the server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
})();
