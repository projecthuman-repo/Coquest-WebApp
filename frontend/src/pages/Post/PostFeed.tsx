import React from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "../../components/Buttons/AddButton";
import Post from "../../components/Post";
import "./PostFeed.css";

function PostFeed() {
	const navigate = useNavigate();

	return (
		<div className="post-feed">
			<div className="post-feed-header">
				<h1>Posts</h1>
				<AddButton onClick={() => navigate("/posts/create")} />
			</div>
			<div className="post-feed-posts">
				<Post />
				<Post />
				<Post />
			</div>
		</div>
	);
}

export default PostFeed;
