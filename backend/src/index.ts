import "source-map-support/register";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import cors from "cors";
import { DBConnection } from "./db/connection";
import cookieParser from "cookie-parser";

// Construct a schema, using GraphQL schema language
import typeDefs from "./graphql/typeDefs";

// Provide resolver functions for your schema fields
import resolvers from "./graphql/resolvers";
import CONFIG from "./config";
import { makeExecutableSchema } from "@graphql-tools/schema";
import formatObjDirectiveTransformer from "./graphql/formatObj";
import authDirectiveTransformer from "./graphql/auth";
import { verifyToken } from "./utils/token";
import verifyTokenDirectiveTransformer from "./graphql/verifyToken";

const corsOptions = {
  credentials: true,
  origin: [CONFIG.CROSS_ORIGIN],
};

async function startServer() {
  await DBConnection.init(process.env.DATABASE_CONNECTION);

  const app = express();
  app.use(cors(corsOptions));
  app.use(cookieParser());

  let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  schema = formatObjDirectiveTransformer(schema, "formatObj");
  schema = authDirectiveTransformer(schema, "auth");
  schema = verifyTokenDirectiveTransformer(schema, "verifyToken");

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  await server.start();
  // Disabling CORS again here
  // @ts-expect-error - TypeError related to express here, but it works
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
