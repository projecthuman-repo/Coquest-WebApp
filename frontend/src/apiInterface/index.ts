const headers = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "*",
	"Access-Control-Allow-Headers": "*",
};

export const get = (name: string, parameters: string[]) => {
	const request = `${import.meta.env.VITE_API_ENDPOINT}?key=${import.meta.env.VITE_API_KEY}&query=query{${name}{${parameters.join(" ")}}}`;
	return fetch(request, {
		headers,
		mode: "cors",
	})
		.then((data) => data.json())
		.then(({ data }) => data[name]);
};

export const find = (name: string, id: string, parameters: string[]) => {
	const getIDType = () => {
		switch (name) {
			case "findUserbyID":
				return "userID";
			case "findTaskbyID":
				return "taskID";
			case "findQuestbyID":
				return "questID";
			case "findPostbyID":
				return "postID";
			case "findInventoryItembyID":
				return "itemID";
			case "findEventbyID":
				return "eventID";
			case "findCommunitybyID":
				return "communityID";
			default:
				throw new Error(
					"Error at find function, invalid find query name",
				);
		}
	};

	const query = `query{
		${name}(${getIDType()}:"${id}"){
			${parameters.join(" ")}
		}
	}`;

	const request = `${import.meta.env.VITE_API_ENDPOINT}?key=${import.meta.env.VITE_API_KEY}&query=${query}`;

	console.log(request);

	return fetch(request, {
		headers,
		mode: "cors",
	})
		.then((data) => data.json())
		.then(({ data }) => data[name]);
};
