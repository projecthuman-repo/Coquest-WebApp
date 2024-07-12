import React from "react";
import "./Comment.css";

export type CommentProps = {
	author: string;
	message: string;
};

const Comment = ({ author, message }: CommentProps) => {
	return (
		<div className="comment">
			<div className="info-line">
				<p className="author">{author}</p>
			</div>
			<div className="message">
				<p>{message}</p>
			</div>
		</div>
	);
};

export default Comment;
