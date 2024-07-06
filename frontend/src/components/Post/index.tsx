import React from "react";
import Button from "@mui/material/Button";
import Comment from "./Comment";
import "./index.css";

// export type PostProps = {
// 	author: string;
// 	likes: number;
// 	comments: string[];
// };

const Post = () => {
	const [liked, setLiked] = React.useState(false);

	const handleLike = () => {
		setLiked(!liked);
	};

	return (
		<div className="post">
			<div>
				<div className="post-image">
					<img src="/image_placeholder.png" alt="Image placeholder" />
					<button className="like-btn" onClick={handleLike}>
						{liked ? (
							<img
								src="/icons/heart-filled.png"
								alt="Unlike"
								className="like-icon"
							/>
						) : (
							<img
								src="/icons/heart.png"
								alt="Like"
								className="like-icon"
							/>
						)}
					</button>
				</div>
				<div className="post-info">
					<p className="post-title">Post Title</p>
					<p className="post-message">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Aenean finibus lorem ac massa bibendum facilisis.
						Curabitur quis scelerisque risus. Maecenas sit amet
						ipsum rhoncus, mollis dui suscipit, suscipit quam. Fusce
						nisl urna, malesuada non dapibus sed, hendrerit vel
						lacus. Donec tincidunt vestibulum augue vitae consequat.{" "}
					</p>
					<div className="info-line">
						<p className="post-author">by author_username</p>
						<p className="post-date">July 3, 2024</p>
					</div>
				</div>
			</div>

			<div className="comments">
				<h3>Comments</h3>
				<Comment
					author="author_username"
					date="July 4, 2024"
					message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				/>
				<Comment
					author="author_username"
					date="July 4, 2024"
					message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				/>
				<Comment
					author="author_username"
					date="July 4, 2024"
					message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				/>
				<Comment
					author="author_username"
					date="July 4, 2024"
					message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				/>
				<div className="add-comment">
					<textarea rows={2} placeholder="Add a comment" />
					<Button>
						<div className="send-btn-container">
							<img src="/icons/send.png" alt="Send" />
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Post;
