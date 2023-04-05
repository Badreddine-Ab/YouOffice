const { gql } = require('apollo-server-express');
const userTypeDefs = require('./user');

const rootTypeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = [rootTypeDefs, userTypeDefs];

module.exports = typeDefs;
