import { GraphQLError } from "graphql";

export enum ServerErrorCodes {
  UNAUTHENTICATED = "UNAUTHENTICATED",
  FORBIDDEN = "FORBIDDEN",
  INVALID_INPUT = "INVALID_INPUT",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  NOT_FOUND = "NOT_FOUND",
}

type ServerErrorExtensions = {
  code: ServerErrorCodes;
  cause?: unknown;
  [key: string]: any;
};

export class ServerError extends GraphQLError {
  constructor(message: string, extensions: ServerErrorExtensions) {
    super(message, { extensions });
  }
}
