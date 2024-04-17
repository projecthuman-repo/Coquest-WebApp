const { SchemaDirectiveVisitor } = require('apollo-server-express');
const jwt = require("jsonwebtoken");
const { defaultFieldResolver } = require('graphql');

class VerifyTokenDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const originalResolve = field.resolve || defaultFieldResolver;
        field.resolve = async function (...args) {
            // Extract the token from arguments
            const token = args[1].token; // assuming the token is the second argument
            try {
                // TODO: settle on an appropriate HMAC key and possibly retrieve it securely
                jwt.verify(token, 'your-access-token-secret');
                // Proceed if the token is valid
                return originalResolve.apply(this, args);
            } catch(err) {
                console.error("Invalid token:", err);
                throw new Error("Invalid token provided");
            }
        }
    }
}

module.exports = VerifyTokenDirective;
