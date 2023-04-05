const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    role: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  input RegisterInput {
    email: String!
    password: String!
    role: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    registerUser(input: RegisterInput): Auth!
    loginUser(input: LoginInput): Auth!
  }
`;

module.exports = userTypeDefs;
