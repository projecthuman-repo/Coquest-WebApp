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

function verifyTokenDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string,
) {
  const schemaMapper: SchemaMapper = {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const verifyTokenDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];

      if (!verifyTokenDirective) return fieldConfig;

      const originalResolver = fieldConfig.resolve || defaultFieldResolver;

      fieldConfig.resolve = async (source, args, context, info) => {
        const { token } = args;
        const secret = await getSecret(CONFIG.ACCESS_JWT_NAME);
        if (!secret) throw new Error("Secret not found.");

        await verifyToken(token, secret, context);

        return originalResolver(source, args, context, info);
      };

      return fieldConfig;
    },
  };
  return mapSchema(schema, schemaMapper);
}

export default verifyTokenDirectiveTransformer;
