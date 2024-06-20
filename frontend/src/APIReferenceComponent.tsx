import React, { useEffect, useState } from "react";
import { get, find } from "./apiInterface";
import "./style.css";

const APIReferenceComponent = () => {
	const [allUsers, setAllUsers] = useState([]);
	const [singleUserInfo, setSingleUserInfo] = useState();

	// all get functions return an array of data
	useEffect(() => {
		get("getUsers", ["userID", "currentLevel"]).then(setAllUsers);
	}, []);

	// all find by ID functions return a single point of data
	useEffect(() => {
		find("findUserbyID", "k443h3", ["userID", "currentLevel"]).then(
			setSingleUserInfo,
		);
	}, []);

	return (
		<div>
			{allUsers &&
				allUsers.map((data: any) => (
					<div key={data.userID}>{JSON.stringify(data)}</div>
				))}
			<br />
			{singleUserInfo ? JSON.stringify(singleUserInfo) : "Loading..."}
		</div>
	);
};

export default APIReferenceComponent;
