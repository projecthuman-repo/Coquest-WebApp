import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import Input from "../../components/Input";
import "./Comment.css";
import "./index.css";

// export type PostProps = {
// 	author: string;
// 	likes: number;
// 	comments: string[];
// };

// import { subscribeToUserModelSubject } from "../../observers/userobserver";
// import { User } from "../../models/usermodel";
// const { userId } = useParams<{ userId: string }>();
// const [user, setUser] = useState<User | null>(null);
// const isOwnProfile = !userId;

// useEffect(() => {
// 	let unsubscribe: (() => void) | null | undefined = null;

// 	const setupSubscription = async () => {
// 		unsubscribe = await subscribeToUserModelSubject((user) => {
// 			if (isOwnProfile || user.id === userId) {
// 				setUser(user);
// 			}
// 		});
// 	};

// 	setupSubscription();

// 	return () => {
// 		if (unsubscribe) {
// 			unsubscribe();
// 		}
// 	};
// }, [userId, isOwnProfile]);

const Post = () => {
	const [liked, setLiked] = useState(false);
	const [comment, setComment] = useState("");

	const handleLike = () => {
		setLiked(!liked);

		// TODO Update like status in backend
	};

	const onEditComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	};

	const sendComment = () => {
		// comment shoun't be empty or only whitespace
		if (comment === "" || !comment.trim()) {
			return;
		}

		//create comment - structure follows Comment element
		const comments = document.querySelector(".comments");
		const newComment = document.createElement("div");
		newComment.className = "comment";
		const infoLine = document.createElement("div");
		infoLine.className = "info-line";
		const author = document.createElement("p");
		author.className = "author";
		// TODO get real author username
		author.innerText = "author_username";
		const date = document.createElement("p");
		date.className = "date";
		const today = new Date();
		date.innerText = today.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		infoLine.appendChild(author);
		infoLine.appendChild(date);
		const message = document.createElement("div");
		message.className = "message";
		const messageText = document.createElement("p");
		messageText.innerText = comment;
		message.appendChild(messageText);
		newComment.appendChild(infoLine);
		newComment.appendChild(message);
		comments?.insertBefore(newComment, comments.firstChild); // new comment displayed on the top

		// TODO Send comment to backend
		setComment("");
	};

	// after component load, set max height of comment section
	useEffect(() => {
		// post-container determines the height of the whole post
		// comments-container is the same height as post-container
		// and new comments should not add new height to post (can be scrollable if needed)
		const postContainerHeight = document.querySelector(
			".post-container",
		) as HTMLElement;
		const commentsContainer = document.querySelector(
			".comments-container",
		) as HTMLElement;
		if (postContainerHeight && commentsContainer) {
			commentsContainer.style.maxHeight =
				postContainerHeight.clientHeight + "px";
		}
	}, []);

	return (
		<div className="post">
			<div className="post-container">
				<div className="post-image-container">
					<img
						src="/image_placeholder.png"
						alt="Image placeholder"
						className="post-image"
					/>
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
					<p className="title">Post Title</p>
					<p className="message">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Aenean finibus lorem ac massa bibendum facilisis.
						Curabitur quis scelerisque risus. Maecenas sit amet
						ipsum rhoncus, mollis dui suscipit, suscipit quam. Fusce
						nisl urna, malesuada non dapibus sed, hendrerit vel
						lacus. Donec tincidunt vestibulum augue vitae consequat.{" "}
					</p>
					<div className="info-line">
						<p className="author">by author_username</p>
						<p className="date">July 3, 2024</p>
					</div>
				</div>
			</div>

			<div className="comments-container">
				<h3>Comments</h3>
				<div className="comments">
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
				</div>
				<div className="add-comment">
					<Input label="Your comment">
						<textarea
							rows={2}
							placeholder=""
							className="comment-message"
							value={comment}
							onChange={onEditComment}
						></textarea>
					</Input>
					<button onClick={sendComment}>
						<div className="send-btn-container">
							<img
								src="/icons/send.png"
								alt="Send"
								className="send-icon"
							/>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Post;
