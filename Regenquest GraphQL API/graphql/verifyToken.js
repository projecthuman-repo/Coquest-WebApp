const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');
const { getSecret } = require('../utils/gcloud');
const { verifyToken } = require('../utils/token');

class VerifyTokenDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const originalResolve = field.resolve || defaultFieldResolver;
        field.resolve = async function (...args) {
            const [, , context] = args;
            // Extract the token from arguments
            const token = args[1].token; // assuming the token is the second argument
            const secret = await getSecret(process.env.ACCESS_JWT_NAME);

            await verifyToken(token, secret, context);

            return originalResolve.apply(this, args);
        }
    }
}

module.exports = VerifyTokenDirective;
