import React from "react";
import "./Comment.css";

export type CommentProps = {
	author: string;
	date: string; // TODO: Update to Date type
	message: string;
};

const Comment = ({ author, date, message }: CommentProps) => {
	return (
		<div className="comment">
			<div className="info-line">
				<p className="author">{author}</p>
				<p className="date">{date}</p>
			</div>
			<div className="message">
				<p>{message}</p>
			</div>
		</div>
	);
};

export default Comment;
