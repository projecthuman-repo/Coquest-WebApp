import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AddButton from "../../components/Buttons/AddButton";
import Post from "../../components/Post";
import "./PostFeed.css";

function PostFeed() {
	const navigate = useNavigate();

	return (
		<div className="post-feed">
			<div className="post-feed-header">
				<h1>Posts</h1>
				<Button onClick={() => navigate("/posts/create")}>
					<AddButton />
				</Button>
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
