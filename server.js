const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./graphql/types/typeDefs");
const resolvers = require("./graphql/resolvers/resolvers");

// Database
require("./database/connect.js");

// Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Express
const app = express();

// Link Apollo to Express
server.applyMiddleware({ app });

app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
);
