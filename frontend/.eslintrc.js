module.exports = {
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "custom-eslint-rules/no-unused-vars-interface": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
  },
};
