import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8080/",
  generates: {
    "src/__generated__/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb"],
    },
    // "./graphql.schema.json": {
    //   plugins: ["introspection"]
    // }
  },
};

export default config;
