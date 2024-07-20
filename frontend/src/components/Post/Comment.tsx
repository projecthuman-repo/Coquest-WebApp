import React from "react";
// import { Link } from "react-router-dom";
import "./Comment.css";

export type CommentProps = {
	// TODO userID might be useful (to link to the user's profile)
	author: string;
	message: string;
	//TODO add comment date and like count
};

const Comment = ({ author, message }: CommentProps) => {
	return (
		<div className="comment">
			<div className="info-line">
				{/* TODO add user profile link, usedID needed */}
				{/* <Link to={`/profile/${userID}`}> */}
				<p className="author">{author}</p>
				{/* </Link> */}
			</div>
			<div className="message">
				<p>{message}</p>
			</div>
		</div>
	);
};

export default Comment;
