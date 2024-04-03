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
  context: ({ req, res }) => ({ req, res }),
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

// TODO: find out how to integrate CORS with Apollo Server Cloud Functions
// exports.handler = server.createHandler();
exports.handler = server.createHandler({
  // cors: {
  //   origin: [
  //     'http://127.0.0.1:3000',
  //     'http://localhost:3000',
  //   ],
  //   methods: [
  //     'GET',
  //     'HEAD',
  //     'PUT',
  //     'PATCH',
  //     'POST',
  //     'DELETE',
  //     'OPTIONS'
  //   ],
  //   credentials: true,
  // },
});
