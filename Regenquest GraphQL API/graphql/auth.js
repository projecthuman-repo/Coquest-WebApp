const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');
const { getSecret } = require('../utils/gcloud');
const { verifyToken } = require('../utils/token');

class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (...args) {
            const [, , context] = args;

            const token = context.req.cookies[process.env.AUTH_COOKIE_NAME];
            const secret = await getSecret(process.env.ACCESS_JWT_NAME);

            await verifyToken(token, secret, context);
            
            return resolve.apply(this, args);
        }
    }
}

module.exports = AuthDirective;
