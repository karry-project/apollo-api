const { gql } = require("apollo-server-core");

const credentials = gql`
  type CredentialsType {
    password: String
    email: String
  }

  input CredentialsInputType {
    password: String!
    email: String!
  }

  type MeType {
    token: String
    _id: String
    firstname: String
    lastname: String
    email: String
    phone: String
    profilePicture: String
  }
`;

module.exports = { credentials };
