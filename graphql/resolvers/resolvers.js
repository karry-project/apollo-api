const AuthMutations = require("./auth/mutations");
const AuthQueries = require("./auth/queries");

const resolvers = {
  Query: {
    ...AuthQueries
  },
  Mutation: {
    ...AuthMutations
  }
};

module.exports = resolvers;
