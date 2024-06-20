import React, { useState } from "react";
import "../Orientation.css";
import "./Bio.css";

const MAX_CHAR_COUNT = 1000;

function Bio(props: any) {
	const [biography, setBiography] = useState(props.user?.biography);

	function onEditBio(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const newBio = e.target.value;
		setBiography(newBio);
		props.updateData(newBio);
	}

	// Explicity check for empty string as TS treats empty strings as falsy
	if (biography || biography === "") {
		return (
			<div className="bio-page">
				<h3 className="main-heading">
					Welcome to Coquest&#44; {props.user?.name.first}!
				</h3>
				<p className="sub-heading">Let&apos;s get to know you.</p>
				<div className="bio-wrapper">
					<textarea
						className="bio-input"
						placeholder="Add your bio"
						value={biography}
						onChange={onEditBio}
						maxLength={MAX_CHAR_COUNT}
					></textarea>
					<small className="char-count">
						{biography.length}&nbsp;/&nbsp;{MAX_CHAR_COUNT}
					</small>
				</div>
			</div>
		);
	} else {
		return null;
	}
}

export default Bio;
