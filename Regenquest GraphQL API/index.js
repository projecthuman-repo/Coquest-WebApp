const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// TODO: find out how to reinclude this plugin
// const {
//   ApolloServerPluginLandingPageLocalDefault,
// } = require('apollo-server-core');
const cors = require("cors");
const { connectToDatabases } = require('./db/connection');
const cookieParser = require("cookie-parser");

// Construct a schema, using GraphQL schema language
const typeDefs = require('./graphql/typeDefs');

// Provide resolver functions for your schema fields
const resolvers = require('./graphql/resolvers');

const corsOptions = {
  credentials: true,
  origin: [
    process.env.CROSS_ORIGIN,
  ]
};

async function startServer() {
  await connectToDatabases();

  const app = express();
  app.use(cors(corsOptions));
  app.use(cookieParser());

  const server = new ApolloServer({
    // Disable Apollo Server's built-in CORS policy definition option because it does not work  
    cors: false,
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    context: ({ req, res }) => ({ req, res }),
    // plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  
  await server.start();
  // Disabling CORS again here
  server.applyMiddleware({ app, cors: false, path: '/' });
  
  return app;
}

let appPromise = startServer();

exports.handler = (req, res) => {
  appPromise.then(app => {
    app(req, res);
  }).catch(err => {
    console.error('Error starting server:', err);
  });
};
