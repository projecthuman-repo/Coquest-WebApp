// custom-rules/no-unused-vars-interface.js
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "disallow unused variables in interfaces",
      category: "Variables",
      recommended: true,
    },
    schema: [],
  },
  create(context) {
    return {
      "TSTypeAliasDeclaration, TSInterfaceDeclaration FunctionDeclaration, FunctionExpression"(
        node,
      ) {
        if (
          node.type === "TSInterfaceDeclaration" ||
          node.type === "TSTypeAliasDeclaration"
        ) {
          // Ignore unused variables in interfaces and type aliases
          return;
        }

        if (
          node.type === "FunctionDeclaration" ||
          node.type === "FunctionExpression"
        ) {
          node.params.forEach((param) => {
            if (param.type === "Identifier" && param.name.startsWith("_")) {
              // If the parameter starts with '_', ignore it
              return;
            }
          });
        }

        // Default behavior
        context.report({
          node,
          message: `Unused variable found.`,
        });
      },
    };
  },
};
