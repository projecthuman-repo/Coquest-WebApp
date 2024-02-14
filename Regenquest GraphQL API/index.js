const { ApolloServer, gql } = require('apollo-server-cloud-functions');
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');
const { connectToDatabases } = require('./db/connection');

// Construct a schema, using GraphQL schema language
const typeDefs = require('./graphql/typeDefs');

// Provide resolver functions for your schema fields
const resolvers = require('./graphql/resolvers');

connectToDatabases()
  .then(() => {
    console.log('All mongodb connection successful.');
  })
  .catch((err) => {
    console.error(err);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

exports.handler = server.createHandler();
