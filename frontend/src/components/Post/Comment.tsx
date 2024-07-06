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
				<p className="comment-author">{author}</p>
				<p className="comment-date">{date}</p>
			</div>
			<div className="comment-message">
				<p>{message}</p>
			</div>
		</div>
	);
};

export default Comment;
