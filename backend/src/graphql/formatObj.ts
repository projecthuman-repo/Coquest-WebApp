import { defaultFieldResolver, GraphQLSchema } from "graphql";
import { buildPopulateOptions, toOutputFormat } from "../utils/expandable";
import { getJson } from "../utils/misc";
import { DBConnection } from "../db/connection";
import mongoose from "mongoose";
import {
  mapSchema,
  getDirective,
  MapperKind,
  SchemaMapper,
} from "@graphql-tools/utils";

interface FormatObjArgs {
  dbName: string;
  modelName: string;
}

function formatObjDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string,
) {
  const schmaMapper: SchemaMapper = {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const formatObjDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];

      if (!formatObjDirective) return fieldConfig;

      const { dbName, modelName } = formatObjDirective as FormatObjArgs;
      const originalResolver = fieldConfig.resolve || defaultFieldResolver;

      fieldConfig.resolve = async function (source, args, context, info) {
        let result = await originalResolver(source, args, context, info);
        const { expand } = args;
        const expandParsed = getJson(expand);

        const existingConnections =
          // @ts-expect-error - otherDbs is a valid members of getConnection()
          DBConnection.getConnection().otherDbs as mongoose.Connection[];

        const dbConnection = existingConnections.find(
          (db) => db.name === dbName,
        );

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
            // @ts-expect-error - result is of type unknown
            // I am not sure what populate() method does.
            result = await result.populate(populateOptions);
          }
          // @ts-expect-error - result is of type unknown
          result = result.toObject();
          result = toOutputFormat(
            result,
            dbConnection,
            // @ts-expect-error - tree probably exists, yet to test it.
            dbConnection.model(modelName).schema.tree,
          );

          // @ts-expect-error - result is of type unknown
          return result.objValue;
        } catch (err) {
          console.error(err);
          throw err;
        }
      };

      return fieldConfig;
    },
  };
  return mapSchema(schema, schmaMapper);
}

export default formatObjDirectiveTransformer;
