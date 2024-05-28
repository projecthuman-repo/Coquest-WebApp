const { SchemaDirectiveVisitor } = require('apollo-server-express');
const jwt = require("jsonwebtoken");
const { defaultFieldResolver } = require('graphql');
const { getSecret } = require('../utils/gcloud');

class VerifyTokenDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const originalResolve = field.resolve || defaultFieldResolver;
        field.resolve = async function (...args) {
            // Extract the token from arguments
            const token = args[1].token; // assuming the token is the second argument
            try {
                await jwt.verify(token, await getSecret(process.env.ACCESS_JWT_NAME));
                // If failed, attempt to verify attempt to refresh the token
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
