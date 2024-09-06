import express from "express";
import { ApolloServer } from "apollo-server-express";
// TODO: find out how to reinclude this plugin
// const {
//   ApolloServerPluginLandingPageLocalDefault,
// } = require('apollo-server-core');
import cors from "cors";
import { DBConnection } from "./db/connection";
import cookieParser from "cookie-parser";
import AuthDirective from "./graphql/auth";
import VerifyTokenDirective from "./graphql/verifyToken";
import FormatObjDirective from "./graphql/formatObj";

// Construct a schema, using GraphQL schema language
import typeDefs from "./graphql/typeDefs";

// Provide resolver functions for your schema fields
import resolvers from "./graphql/resolvers";
import CONFIG from "./config";

const corsOptions = {
  credentials: true,
  origin: [CONFIG.CROSS_ORIGIN],
};

async function startServer() {
  await DBConnection.init(process.env.DATABASE_CONNECTION);

  const app = express();
  app.use(cors(corsOptions));
  app.use(cookieParser());

  const server = new ApolloServer({
    // Disable Apollo Server's built-in CORS policy definition option because it does not work
    cors: false,
    typeDefs,
    resolvers,
    schemaDirectives: {
      auth: AuthDirective,
      verifyToken: VerifyTokenDirective,
      formatObj: FormatObjDirective,
    },
	  csrfPrevention: true,
	// @ts-expect-error - TODO: fix this
    cache: "bounded",
    context: ({ req, res }) => ({ req, res }),
    // plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  await server.start();
  // Disabling CORS again here
  server.applyMiddleware({ app, cors: false, path: "/" });

  return app;
}

const appPromise = startServer();

export const handler = (req, res) => {
  appPromise
    .then((app) => {
      app(req, res);
    })
    .catch((err) => {
      console.error("Error starting server:", err);
    });
};
