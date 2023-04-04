require("dotenv").config();
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Define your GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your GraphQL resolvers
const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
};

// Create an ApolloServer instance
const server = new ApolloServer({ typeDefs, resolvers });

// Create an Express app
const app = express();

// Wrap the server start and applyMiddleware calls within an async function
(async () => {
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
