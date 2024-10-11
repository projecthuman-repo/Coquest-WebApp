import { graphql } from "@/__generated__";

/*
 * To read more, go to ./example/gqlStringsExample.ts
 */

export const topicsQuery = graphql(`
	query GetTopics {
		options: getTopics {
			name
		}
	}
`);

export const motivesQuery = graphql(`
	query GetMotives {
		options: getMotives {
			name
		}
	}
`);
