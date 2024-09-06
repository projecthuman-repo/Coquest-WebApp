import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { getSecret } from "../utils/gcloud";
import { verifyToken } from "../utils/token";
import CONFIG from "../config";

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const [, , context] = args;

      const token = context.req.cookies[CONFIG.AUTH_COOKIE_NAME];
      const secret = await getSecret(CONFIG.ACCESS_JWT_NAME);
      if (!secret) throw new Error("Secret not found.");

      await verifyToken(token, secret, context);

      return resolve.apply(this, args);
    };
  }
}

export default AuthDirective;
