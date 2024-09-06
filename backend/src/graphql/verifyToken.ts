import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { getSecret } from "../utils/gcloud";
import { verifyToken } from "../utils/token";
import CONFIG from "../config";

class VerifyTokenDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const originalResolve = field.resolve || defaultFieldResolver;
    field.resolve = async function (...args) {
      const [, , context] = args;
      // Extract the token from arguments
      const token = args[1].token; // assuming the token is the second argument
      const secret = await getSecret(CONFIG.ACCESS_JWT_NAME);

      if (!secret) throw new Error("Secret not found.");

      await verifyToken(token, secret, context);

      return originalResolve.apply(this, args);
    };
  }
}

export default VerifyTokenDirective;
