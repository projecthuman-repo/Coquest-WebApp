import React, { useState } from "react";
import { topicsQuery } from "../../../apiInterface/gqlOperations";
import InterestList from "../../../components/CheckboxList/InterestList";
import "../Orientation.css";
import "./Interests.css";

function Interests(props: any) {
	const [topics, setTopics] = useState(new Set<string>(props.user.topics));

	function setInterests(interests: Set<string>) {
		setTopics(interests);
	}

	return (
		<div className="interests-page">
			<h3 className="main-heading">Let’s get you stitched in.</h3>
			<p className="sub-heading">What are your interests?</p>
			<div className="search-container">
				<img
					src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png"
					className="search-icon"
					alt="Search Icon"
				/>
				<input
					type="search"
					className="search"
					name="search"
					placeholder="Search"
				/>
			</div>
			<p className="sub-text">Select 3 or more.</p>
			<InterestList
				setFuncs={[setInterests, props.updateData]}
				checkedData={topics}
				query={topicsQuery}
			/>
		</div>
	);
}

export default Interests;
