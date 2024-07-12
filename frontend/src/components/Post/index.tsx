import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import Input from "../Input";
import ImageCarousel from "../ImageCarousel";
import Loading from "../Loading";
import { subscribeToUserModelSubject } from "../../observers/userobserver";
import { User } from "../../models/usermodel";
import "./Comment.css";
import "./index.css";

export type PostProps = {
	// userID: string;	// TODO: deternime username from userID
	title: string;
	description: string;
	likes: number;
	attachments: string[];
	createdAt: string;
	comments: { username: string; body: string }[];
};

const Post = ({
	// userID,
	title,
	description,
	likes,
	attachments,
	createdAt,
	comments,
}: PostProps) => {
	const [likeCount, setLikeCount] = useState(likes);
	const [liked, setLiked] = useState(false);
	const [comment, setComment] = useState("");
	const [user, setUser] = useState<User | null>(null);

	const [postContainer, setPostContainer] = useState<HTMLElement | null>(
		null,
	);
	const [commentsContainer, setCommentsContainer] =
		useState<HTMLElement | null>(null);

	// after component load, set max height of comment section
	useEffect(() => {
		// post-container determines the height of the whole post
		// comments-container is the same height as post-container
		// and new comments should not add new height to post (can be scrollable if needed)

		// initial height setup
		setPostContainer(
			document.querySelector("div.post-container") as HTMLElement,
		);
		setCommentsContainer(
			document.querySelector("div.comments-container") as HTMLElement,
		);
		if (postContainer && commentsContainer) {
			commentsContainer.style.maxHeight =
				postContainer?.clientHeight + "px";
		}

		// height change on window resize
		window.addEventListener("resize", () => {
			setPostContainer(
				document.querySelector("div.post-container") as HTMLElement,
			);
			if (postContainer && commentsContainer) {
				commentsContainer.style.maxHeight =
					postContainer?.clientHeight + "px";
			}
		});

		// get user of the account from whose name the comments will be posted
		let unsubscribe: (() => void) | null | undefined = null;
		const setupSubscription = async () => {
			unsubscribe = await subscribeToUserModelSubject((user) => {
				setUser(user);
			});
		};

		setupSubscription();

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}

			window.removeEventListener("resize", () => {
				setPostContainer(null);
			});
		};
	}, [user, postContainer?.clientHeight]);

	if (!user) {
		return <Loading />;
	}

	const handleLike = () => {
		setLiked(!liked);
		setLikeCount(liked ? likeCount - 1 : likeCount + 1);

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
		author.innerText = user.username;
		infoLine.appendChild(author);
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

	//TODO add user profile link and comment profile link
	return (
		<div className="post">
			<div className="post-container">
				<div className="post-image-container">
					<div className="back-icon-container">
						<img
							src="/icons/arrow-back.png"
							alt="Back"
							className="back-icon"
						/>
					</div>
					<ImageCarousel images={attachments} />
					<div className="forward-icon-container">
						<img
							src="/icons/arrow-forward.png"
							alt="Forward"
							className="forward-icon"
						/>
					</div>
					{/* LIKE BUTTON STYLE VARIANT */}
					{/* <div className="like-btn-background"></div>
					<div className="like-btn">
						<button onClick={handleLike}>
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
						<small className="like-count">{likeCount}</small>
					</div> */}
				</div>
				<div className="post-info">
					<div className="post-heading">
						<p className="title">{title}</p>
						<div className="like-btn">
							<button onClick={handleLike}>
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
							<small className="like-count">{likeCount}</small>
						</div>
					</div>
					<p className="message">{description}</p>
					<div className="info-line">
						<p className="author">by author_username</p>
						<p className="date">
							{new Date(createdAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
					</div>
				</div>
			</div>

			<div className="comments-container">
				<h3>Comments</h3>
				<div className="comments">
					{comments.map((comment, index) => (
						<Comment
							key={index}
							author={comment.username}
							message={comment.body}
						/>
					))}
				</div>
				<div className="add-comment">
					<Input label="Your comment">
						<textarea
							rows={2}
							placeholder=""
							className="comment-message"
							value={comment}
							onChange={onEditComment}
							maxLength={2000} // TODO: change this to Coquest comment character limit
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
