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
				<Post
					// userID="1"
					title="Interesting Title"
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus lorem ac massa bibendum facilisis. Curabitur quis scelerisque risus. Maecenas sit amet ipsum rhoncus, mollis dui suscipit, suscipit quam. Fusce nisl urna, malesuada non dapibus sed, hendrerit vel lacus. Donec tincidunt vestibulum augue vitae consequat."
					likes={123}
					attachments={[
						"/image_placeholder.jpg",
						"/image_placeholder1.png",
					]}
					createdAt="2024-05-05"
					comments={[
						{
							username: "author_username",
							body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
						},
						{
							username: "author_username",
							body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
						},
						{
							username: "author_username",
							body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
						},
						{
							username: "author_username",
							body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
						},
						{
							username: "author_username",
							body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
						},
					]}
				/>
				<Post
					// userID="2"
					title="Another Interesting Title"
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus lorem ac massa bibendum facilisis. Curabitur quis scelerisque risus. "
					likes={567}
					attachments={["/image_placeholder.jpg"]}
					createdAt="2024-07-05"
					comments={[
						{
							username: "author_username",
							body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
						},
						{
							username: "author_username",
							body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
						},
					]}
				/>
			</div>
		</div>
	);
}

export default PostFeed;
