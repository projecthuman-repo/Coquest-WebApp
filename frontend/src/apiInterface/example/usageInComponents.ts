import { useQuery } from "@tanstack/react-query";
import graphQLClient from "../client";
import { Queries } from "./gqlStringsExample";

/*
 * This is an example of how to use the generated code in a component using useQuery.
 * Please read more about the useQuery hook in the react-query documentation.
 */
const { data } = useQuery({
	queryKey: ["GetURLAndUsers"],
	queryFn: async () => await graphQLClient.request(Queries.GET_URL_AND_USERS),
});
// data is fully typed
data?.generatePresignedURL;
data?.getUsers;

/* Alternatively,
 * This is an example of how to use the generated code in a component using a regular function.
 * It can be used inside a useEffect hook or in a regular function.
 */
(async () => {
	graphQLClient.request(Queries.GET_URL_AND_USERS).then((data) => {
		// data is fully typed
		console.log(data.generatePresignedURL);
		console.log(data.getUsers);
	});
})();
