const { gql } = require("apollo-server-express");
const { credentials } = require("./auth/credentials");

const typeDefs = gql`
  type Query {
    me: MeType
  }
  type Mutation {
    login(credentials: CredentialsInputType): MeType
  }

  # First approach ...
  # TODO: Use a better way to import Type/Input/InputType.
  ${credentials}
`;

module.exports = typeDefs;
