import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { buildPopulateOptions, toOutputFormat } from "../utils/expandable";
import { getJson } from "../utils/misc";
import { DBConnection } from "../db/connection";
import mongoose from "mongoose";

interface FormatObjArgs {
  dbName: string;
  modelName: string;
}

class FormatObjDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    const { dbName, modelName } = this.args as FormatObjArgs;

    field.resolve = async function (...args) {
      let result = await resolve.apply(this, args);
      const [, { _, expand }, , info] = args;
      const expandParsed = getJson(expand);

      // Note: Connection.prototype.listDatabases() member function does not work here for some reason
      const existingConnections =
        // @ts-expect-error - otherDbs is a valid members of getConnection()
        DBConnection.getConnection().otherDbs as mongoose.Connection[];

      const dbConnection = existingConnections.find((db) => db.name === dbName);
      // Note: we don't use useDb() here because it creates a new connection but the schemas aren't registered on it.
      if (!dbConnection)
        throw new Error(`Connection to ${dbName} does not exist.`);

      try {
        if (expandParsed) {
          const populateOptions = buildPopulateOptions(
            info,
            dbConnection,
            modelName,
            expandParsed,
          );
          result = await result.populate(populateOptions);
        }

        result = result.toObject();
        result = toOutputFormat(
          result,
          dbConnection,
          // @ts-expect-error - tree probably exists, yet to test it.
          dbConnection.model(modelName).schema.tree,
        );

        return result.objValue;
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
  }
}

export default FormatObjDirective;
