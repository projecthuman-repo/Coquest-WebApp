const { SchemaDirectiveVisitor } = require('apollo-server-express');
const jwt = require("jsonwebtoken");
const { defaultFieldResolver } = require('graphql');

class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (...args) {
            const [, , context] = args;

            const token = context.req.cookies[process.env.AUTH_COOKIE_NAME];
            try {
                // TODO: settle on an appropriate HMAC key
                jwt.verify(token, 'your-access-token-secret');
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
