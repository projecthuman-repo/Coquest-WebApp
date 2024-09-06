function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

// Return a list of generic array validators for schemas.
// Expects the name of the array field for error message formatting.
function arrValidators(idArrName) {
  return [
    {
      validator: function (ids) {
        return !ids || ids.length > 0;
      },
      message: `${capitalize(idArrName)} array validation failed: if not null, array must contain at least one element`,
    },
    {
      validator: function (ids) {
        if (!ids) {
          return !ids;
        } else {
          const uniqueIds = new Set(ids.map((id) => id.toString()));
          return uniqueIds.size === ids.length;
        }
      },
      message: `${capitalize(idArrName)} array validation failed: array contains duplicates`,
    },
  ];
}

// Return a list of single-element ID validators for schemas, querying the relevant mongoose model as appropriate.
// Expects a callback function returning a MongoDB model and the name of the ID field for error message formatting.
// Providing the model via return value of a callback ensures callers never violate circular dependancy rules.
function idValidators(modelcb, idName) {
  return [
    {
      // Ensure a document with the given ID actually exists
      validator: async function (id) {
        return (await modelcb().findById(id)) !== null;
      },
      message: (props) => `No ${idName} found with ID ${props.id}`,
    },
  ];
}

module.exports = {
  arrValidators,
  idValidators,
};
