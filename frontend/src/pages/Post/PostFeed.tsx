import React from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "../../components/Buttons/AddButton";
import Post from "../../components/Post";
import "./PostFeed.css";

// TODO fetch post data from backend
const data = [
	{
		postID: "1",
		userID: "1",
		title: "Interesting Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus lorem ac massa bibendum facilisis. Curabitur quis scelerisque risus. Maecenas sit amet ipsum rhoncus, mollis dui suscipit, suscipit quam. Fusce nisl urna, malesuada non dapibus sed, hendrerit vel lacus. Donec tincidunt vestibulum augue vitae consequat.",
		likes: 123,
		attachments: [
			"/image_placeholder.jpg",
			"/image_placeholder2.jpg",
			"/image_placeholder1.png",
		],
		createdAt: "2024-05-05",
		comments: [
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
		],
	},
	{
		postID: "2",
		userID: "1",
		title: "Another Interesting Title",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus lorem ac massa bibendum facilisis. Curabitur quis scelerisque risus.",
		likes: 567,
		attachments: ["/image_placeholder.jpg"],
		createdAt: "2024-07-05",
		comments: [
			{
				username: "author_username",
				body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			},
			{
				username: "author_username",
				body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			},
		],
	},
];

function PostFeed() {
	const navigate = useNavigate();

	return (
		<div className="post-feed">
			<div className="post-feed-header">
				<h1>Posts</h1>
				<AddButton onClick={() => navigate("/posts/create")} />
			</div>
			<div className="post-feed-posts">
				{data.map((post, index) => (
					<Post
						key={index}
						postID={post.postID}
						userID={post.userID}
						title={post.title}
						description={post.description}
						likes={post.likes}
						attachments={post.attachments}
						createdAt={post.createdAt}
						comments={post.comments}
					/>
				))}
			</div>
		</div>
	);
}

export default PostFeed;
