import { GraphQLError } from "graphql";

export enum ServerErrorCodes {
  /**
   * The request is missing a valid authentication token or the token expired and auto refresh failed.
   */
  UNAUTHENTICATED = "UNAUTHENTICATED",
  /**
   * The user does not have permission to perform the operation.
   */
  FORBIDDEN = "FORBIDDEN",
  /**
   * The request does not have expected input data.
   * Eg. missing required fields, invalid input values, etc.
   */
  INVALID_INPUT = "INVALID_INPUT",
  /**
   * The server encountered an error.
   */
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  /**
   * The requested resource was not found.
   */
  NOT_FOUND = "NOT_FOUND",
}
/*
Built In Error Codes: These are returned by Apollo Server when it encounters an error.

GRAPHQL_PARSE_FAILED
The GraphQL operation string contains a syntax error.

GRAPHQL_VALIDATION_FAILED
The GraphQL operation is not valid against the server's schema.

BAD_USER_INPUT
The GraphQL operation includes an invalid value for a field argument.

PERSISTED_QUERY_NOT_FOUND
A client sent the hash of a query string to execute via automatic persisted queries,
but the query was not found in the APQ cache.

PERSISTED_QUERY_NOT_SUPPORTED
A client sent the hash of a query string to execute via automatic persisted queries,
but the server has disabled APQ.

OPERATION_RESOLUTION_FAILURE
The request was parsed successfully and is valid against the server's schema,
but the server couldn't resolve which operation to run.
This occurs when a request contains multiple named operations
but doesn't specify which operation to execute (e.g., operationName),
or if the named operation isn't present in the request.

BAD_REQUEST
An error occurred before your server could attempt to parse the given GraphQL operation.

INTERNAL_SERVER_ERROR
An unspecified error occurred.
When Apollo Server formats an error in a response, it sets the code extension to this value
if no other specific error code is set.
*/

type InternalServerErrorExtensions = {
  code: ServerErrorCodes.INTERNAL_SERVER_ERROR;
  cause: unknown;
  privateMessage?: string;
  [key: string]: any;
};

type OtherErrorExtensions = {
  code: Exclude<ServerErrorCodes, ServerErrorCodes.INTERNAL_SERVER_ERROR>;
  cause?: unknown;
  privateMessage?: string;
  [key: string]: any;
};

type ServerErrorExtensions =
  | InternalServerErrorExtensions
  | OtherErrorExtensions;

/**
 * @description
 * Custom error class for all errors that should be returned to the client.
 * This class extends the default `GraphQLError` class and adds a custom error code.
 * The `cause` and `privateMessage` extension is optional and can be used to provide additional context about the error.
 * During production, all extensions except `code` will be omitted from the error response.
 * Note: The `cause` extension is compulsory for `INTERNAL_SERVER_ERROR` errors.
 */
export class ServerError extends GraphQLError {
  constructor(publicMessage: string, extensions: ServerErrorExtensions) {
    super(publicMessage, { extensions });
  }
}
