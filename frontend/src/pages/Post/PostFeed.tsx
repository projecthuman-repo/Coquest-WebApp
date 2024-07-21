import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "../../components/Buttons/AddButton";
import Post from "../../components/Post";
import { PostFeedContext } from "./PostFeedContext";
import "./PostFeed.css";

function PostFeed() {
	const { user } = useContext(PostFeedContext);
	const { posts } = useContext(PostFeedContext);
	const navigate = useNavigate();

	return (
		<div className="post-feed">
			<div className="post-feed-header">
				<h1>Posts</h1>
				<AddButton onClick={() => navigate("/posts/create")} />
			</div>
			<div className="post-feed-posts">
				{posts.map((post, index) => (
					<Post
						key={index}
						postIndex={index}
						userID={post.userID}
						title={post.title}
						description={post.description}
						likes={post.likes}
						attachments={post.attachments}
						createdAt={post.createdAt}
						comments={post.comments}
						newCommentAuthor={user}
					/>
				))}
			</div>
		</div>
	);
}

export default PostFeed;
