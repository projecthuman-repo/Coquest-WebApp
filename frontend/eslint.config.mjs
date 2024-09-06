import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import ignoreUnusedInterface from "./custom-eslint-rules/no-unused-vars-interface.js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    name: "Add keywords to Eslint Dictionary",
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
        module: "readonly",
        require: "readonly",
        process: "readonly",
        __dirname: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
  {
    name: "Typescript XML Config",
    ...pluginReactConfig,
    files: ["**/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    name: "Typescript Linting Config",
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      local: {
        rules: {
          "ignore-unused-interface": ignoreUnusedInterface,
        },
      },
    },
    rules: {
      "local/ignore-unused-interface": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
