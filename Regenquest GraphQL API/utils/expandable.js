const {
  Types: { ObjectId },
} = require("mongoose");

// Constructs an object parameter for the Mongoose `.populate()` routine, specifying which properties to expand.
// TODO: Automatically redact redundant list entries
function buildPopulateOptions(info, db, modelName, userRequestedFields) {
  // Helper function to recursively find population options
  const findPopulationFields = (
    selections,
    modelName,
    subUserRequestedFields,
  ) => {
    const populateOptions = [];

    selections.forEach((field) => {
      const fieldName = field.name.value;
      const model = db.model(modelName);
      const tree = model.schema.tree[fieldName];
      const requestedField = subUserRequestedFields.find(
        (elem) => elem === fieldName || elem[fieldName],
      );

      // Check if the field is expandable, exists in userRequestedFields, and is included in the current query structure
      if (field.selectionSet && tree?.metadata?.expandable && requestedField) {
        const popOption = { path: fieldName };

        if (typeof requestedField === "object") {
          const namedType = tree?.type[0]?.ref;
          let selections = field.selectionSet.selections.find(
            (elem) => elem.typeCondition?.name.value === namedType + "Output",
          );
          // Follow the objValue path to the actual object value
          if (
            selections.selectionSet.selections.length === 1 &&
            selections.selectionSet.selections[0].name.value === "objValue"
          ) {
            selections = selections.selectionSet.selections[0];
          }
          popOption.populate = findPopulationFields(
            selections.selectionSet.selections,
            namedType,
            requestedField[fieldName],
          );
        }
        populateOptions.push(popOption);
      }
    });

    return populateOptions.length > 0 ? populateOptions : null;
  };

  const node = info.fieldNodes.find(
    (node) => node.name.value === info.fieldName,
  );
  return findPopulationFields(
    node.selectionSet.selections,
    modelName,
    userRequestedFields[modelName],
  );
}

// Convert a list of expandable type schemas, `expandable`, into a list of ID strings.
// If the object is expandable, function expects the property named `propName` to be present for use as the ID.
function coerceExpandable(expandable, propName) {
  return (
    expandable?.map((e) => {
      if (e.type === "EXPANDED_OBJ") {
        return e.objValue[propName];
      } else if (e.type === "ID_STRING") {
        return e.strValue;
      } else {
        // *Shouldn't happen*
        return null;
      }
    }) ?? null
  );
}

// Introspects the type of an expandable instance and sniffs out the type of the object `expandableObj`.
// Returns one of the valid expandable member types: string or `expandedTypeName`
function deduceExpandableType(expandableObj, expandedTypeName) {
  if ("strValue" in expandableObj) {
    return "string";
  } else if ("objValue" in expandableObj) {
    return expandedTypeName + "Output";
  } else {
    // *Shouldn't happen*
    return null;
  }
}

// Convert expandable properties to a shape that GraphQL expects based on the output type definition in `typeDefs.js`.
// Expects an input object, `obj`, the database in use, and the MongoDB schema of that object.
function toOutputFormat(obj, db, schema) {
  if (Array.isArray(obj)) {
    return obj.map((elem) => toOutputFormat(elem, schema));
  } else if (obj instanceof ObjectId) {
    return { strValue: obj.toString() };
  } else if (typeof obj === "object" && obj !== null) {
    const processedObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const fieldSchema = schema[key];
        if (!fieldSchema) continue;

        const isExpandable = fieldSchema.metadata?.expandable;
        const newSchemaName = Array.isArray(fieldSchema?.type)
          ? fieldSchema?.type[0]?.ref
          : fieldSchema?.type?.ref;
        if (isExpandable && newSchemaName) {
          processedObj[key] = toOutputFormat(
            obj[key],
            db.model(newSchemaName).schema.tree,
          );
        } else {
          processedObj[key] = obj[key];
        }
      }
    }
    return { objValue: processedObj };
  } else {
    // Return the value as is for non-expandable fields
    return obj;
  }
}

module.exports = {
  buildPopulateOptions,
  coerceExpandable,
  deduceExpandableType,
  toOutputFormat,
};
