import "source-map-support/register";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
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
import verifyTokenDirectiveTransformer from "./graphql/verifyToken";

const corsOptions = {
  credentials: true,
  origin: [CONFIG.CROSS_ORIGIN],
};

async function startServer() {
  await DBConnection.init(CONFIG.DATABASE_CONNECTION);

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
    // v4 of apollo server did not return status 400 for user query errors, this reverses it
    status400ForVariableCoercionErrors: true,
  });

  await server.start();

  app.use(
    "/",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    }),
  );

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
