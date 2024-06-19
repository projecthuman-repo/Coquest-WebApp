const { SchemaDirectiveVisitor } = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");
const mongoose = require("mongoose");
const { buildPopulateOptions, toOutputFormat } = require("../utils/expandable");
const { getJson } = require("../utils/misc");

class FormatObjDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { modelName } = this.args;

    field.resolve = async function (...args) {
      let result = await resolve.apply(this, args);
      const [, { _, expand }, , info] = args;
      const expandParsed = getJson(expand);

      try {
        if (expandParsed) {
          const populateOptions = buildPopulateOptions(
            info,
            modelName,
            expandParsed,
          );
          result = await result.populate(populateOptions);
        }

        result = result.toObject();
        result = toOutputFormat(result, mongoose.model(modelName).schema.tree);

        return result.objValue;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    };
  }
}

module.exports = FormatObjDirective;
