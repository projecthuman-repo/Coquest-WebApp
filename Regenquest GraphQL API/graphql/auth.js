const { SchemaDirectiveVisitor } = require('apollo-server-express');
const jwt = require("jsonwebtoken");
const { defaultFieldResolver } = require('graphql');
const { getSecret } = require('../utils/gcloud');

class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (...args) {
            const [, , context] = args;

            const token = context.req.cookies[process.env.AUTH_COOKIE_NAME];
            try {
                await jwt.verify(token, await getSecret(process.env.ACCESS_JWT_NAME));
                // If failed, attempt to verify attempt to refresh the token
                return resolve.apply(this, args);
            } catch(err) {
                console.error(err);
                context.res.clearCookie(process.env.AUTH_COOKIE_NAME);
                throw new Error(err);
            }
        }
    }
}

module.exports = AuthDirective;
