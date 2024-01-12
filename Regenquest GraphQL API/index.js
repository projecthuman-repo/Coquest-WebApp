const { ApolloServer, gql } = require("apollo-server-cloud-functions");
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

const mongoose = require("mongoose");
require("dotenv").config();

// Construct a schema, using GraphQL schema language
const typeDefs = require("./graphql/typeDefs");

// Provide resolver functions for your schema fields
const resolvers = require("./graphql/resolvers");

const MONGODB = process.env.MONGODB;

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
  console.log("mongodb connection successful.");
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

exports.handler = server.createHandler();
