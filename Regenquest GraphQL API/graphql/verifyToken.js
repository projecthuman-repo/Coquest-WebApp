const { SchemaDirectiveVisitor } = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");
const { getSecret } = require("../utils/gcloud");
const { verifyToken } = require("../utils/token");

class VerifyTokenDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const originalResolve = field.resolve || defaultFieldResolver;
    field.resolve = async function (...args) {
      const [, , context] = args;
      // Extract the token from arguments
      console.log('fdusfsdf');
      const token = args[1].token; // assuming the token is the second argument
      console.log('token in verify token:', token);
      const secret = await getSecret(process.env.ACCESS_JWT_NAME);
      console.log('Got secret');
      await verifyToken(token, secret, context);
      console.log('verified token!');
      return originalResolve.apply(this, args);
    };
  }
}

module.exports = VerifyTokenDirective;
