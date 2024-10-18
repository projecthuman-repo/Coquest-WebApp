import { defaultFieldResolver, GraphQLSchema } from "graphql";
import { getSecret } from "../utils/gcloud";
import { verifyToken } from "../utils/token";
import CONFIG from "../config";
import {
  mapSchema,
  getDirective,
  MapperKind,
  SchemaMapper,
} from "@graphql-tools/utils";
import { ServerError, ServerErrorCodes } from "./ServerError";

function authDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string,
) {
  const schemaMapper: SchemaMapper = {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];

      if (!authDirective) return fieldConfig;

      const originalResolver = fieldConfig.resolve || defaultFieldResolver;

      fieldConfig.resolve = async (source, args, context, info) => {
        const token = context.req.cookies[CONFIG.AUTH_COOKIE_NAME];
        const secret = await getSecret(CONFIG.ACCESS_JWT_NAME);
        if (!secret)
          throw new ServerError("There was an internal server error.", {
            code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
            cause: new Error("Fetching secret failed."),
          });
        await verifyToken(token, secret, context);

        return originalResolver(source, args, context, info);
      };

      return fieldConfig;
    },
  };
  return mapSchema(schema, schemaMapper);
}

export default authDirectiveTransformer;
