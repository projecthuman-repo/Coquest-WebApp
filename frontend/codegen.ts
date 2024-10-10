import type { CodegenConfig } from "@graphql-codegen/cli";

/**
 * This is the configuration file for the GraphQL Code Generator. It is used to
 * generate TypeScript types from the GraphQL schema and operations.
 */
const config: CodegenConfig = {
	schema: "http://localhost:8080/",
	documents: [
		"./src/apiInterface/example/gqlStringsExample.ts",
		"./src/apiInterface/gqlOperations.ts",
	],

	ignoreNoDocuments: true,
	generates: {
		"./src/__generated__/": {
			preset: "client",
		},
		// "./schema.graphql": {
		// 	plugins: ["schema-ast"],
		// 	config: {
		// 		includeDirectives: true,
		// 	},
		// },
	},
};

export default config;
