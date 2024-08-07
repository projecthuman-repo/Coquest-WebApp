const { SchemaDirectiveVisitor } = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");
const { buildPopulateOptions, toOutputFormat } = require("../utils/expandable");
const { getJson } = require("../utils/misc");
const { DBConnection } = require("../db/connection");

class FormatObjDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { dbName, modelName } = this.args;

    field.resolve = async function (...args) {
      let result = await resolve.apply(this, args);
      const [, { _, expand }, , info] = args;
      const expandParsed = getJson(expand);

      // Note: Connection.prototype.listDatabases() member function does not work here for some reason
      const db = DBConnection.getConnection().otherDbs.find(
        (db) => db.name === dbName,
      );

      try {
        if (expandParsed) {
          const populateOptions = buildPopulateOptions(
            info,
            db,
            modelName,
            expandParsed,
          );
          result = await result.populate(populateOptions);
        }

        result = result.toObject();
        result = toOutputFormat(result, db, db.model(modelName).schema.tree);

        return result.objValue;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    };
  }
}

module.exports = FormatObjDirective;
