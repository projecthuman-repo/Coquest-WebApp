import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import Input from "../Input";
import ImageCarousel from "../ImageCarousel";
import { User } from "../../models/usermodel";
import { Image } from "../../models/common";
// import {get, find} from "../../apiInterface";
// import APIReferenceComponent from "../../APIReferenceComponent";
import "./Comment.css";
import "./index.css";

export type PostProps = {
	postIndex: number;
	userID: string;
	title: string;
	description: string;
	likes: number;
	attachments: Image[];
	createdAt: string;
	comments: { username: string; body: string }[];
	newCommentAuthor: User;
};

const Post = ({
	postIndex,
	userID,
	title,
	description,
	likes,
	attachments,
	createdAt,
	comments,
	newCommentAuthor,
}: PostProps) => {
	const [liked, setLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(likes);

	const [collapsed, setCollapsed] = useState(true);
	const [postComments, setPostComments] = useState(comments);
	const [comment, setComment] = useState("");

	const MAX_COMMENT_CHAR_COUNT = 2000; // TODO: change this to Coquest comment character limit

	// for responsive purposes (height matching)
	const [postContainer, setPostContainer] = useState<HTMLElement | null>(
		null,
	);
	const [commentsContainer, setCommentsContainer] =
		useState<HTMLElement | null>(null);

	useEffect(() => {
		// post-container determines the height of the whole post
		// comments-container is the same height as post-container
		// and new comments should not add new height to post (can be scrollable if needed)

		// initial height setup
		setPostContainer(
			document.querySelector(
				`.post[data-post-id="${postIndex}"] .post-container`,
			) as HTMLElement,
		);

		setCommentsContainer(
			document.querySelector(
				`.post[data-post-id="${postIndex}"] .comments-container`,
			) as HTMLElement,
		);

		if (postContainer && commentsContainer && window.innerWidth > 945) {
			if (
				postContainer.clientHeight < 200 &&
				commentsContainer.clientHeight > 200
			)
				commentsContainer.style.maxHeight =
					commentsContainer.clientHeight + "px";
			else
				commentsContainer.style.maxHeight =
					postContainer.clientHeight + "px";
		}

		// comment section should be hidden on small screens
		if (window.innerWidth <= 945 && collapsed === false) {
			setCollapsed(true);
		}

		// height change and comment section visibility on window resize
		window.addEventListener("resize", () => {
			setPostContainer(
				document.querySelector(
					`.post[data-post-id="${postIndex}"] .post-container`,
				) as HTMLElement,
			);
			if (postContainer && commentsContainer && window.innerWidth > 945) {
				if (
					postContainer.clientHeight < 200 &&
					commentsContainer.clientHeight > 200
				)
					commentsContainer.style.maxHeight =
						commentsContainer.clientHeight + "px";
				else
					commentsContainer.style.maxHeight =
						postContainer.clientHeight + "px";
			}

			if (window.innerWidth <= 945 && collapsed === false) {
				setCollapsed(true);
			}
		});

		return () => {
			window.removeEventListener("resize", () => {});
		};
	}, [postContainer, commentsContainer]);

	const handleLike = () => {
		setLiked(!liked);
		setLikeCount(liked ? likeCount - 1 : likeCount + 1);

		// TODO Update like status in backend
	};

	const toggleComments = () => {
		setCollapsed(!collapsed);

		const viewOrHide = document.querySelector(".view-hide") as HTMLElement;
		if (viewOrHide) {
			viewOrHide.innerText = collapsed ? "Hide" : "View";
		}
	};

	const onEditComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	};

	const sendComment = () => {
		// comment shoudn't be empty or only whitespace
		if (comment === "" || !comment.trim()) {
			return;
		}

		setPostComments([
			{ username: newCommentAuthor.username, body: comment },
			...postComments,
		]);
		setComment("");

		// TODO Update post comments in backend
	};

	return (
		<div className="post" data-post-id={postIndex}>
			<div className="post-container">
				<div className="post-image-container">
					<div className="post-image">
						<ImageCarousel images={attachments} />
					</div>
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
						{/* TODO: determine username from userID */}
						<Link to={`/profile/${userID}`}>
							<p className="author">by author_username</p>
						</Link>
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

			<div
				className={`comments-toggle ${collapsed ? "collapsed" : ""}`}
				onClick={toggleComments}
			>
				<img
					src="/icons/comment.png"
					className="icon comment-icon"
					alt="Comment Icon"
				/>
				<p>
					<span className="view-hide">View</span>{" "}
					{postComments.length} comments
				</p>
			</div>

			<div
				className={`comments-container ${collapsed ? "collapsed" : ""}`}
			>
				<h3>Comments</h3>
				<div className="comments">
					{postComments.length > 0 ? (
						postComments.map((comment, index) => (
							<Comment
								key={index}
								author={comment.username}
								message={comment.body}
							/>
						))
					) : (
						<p className="no-comments">No comments</p>
					)}
				</div>
				<div className="add-comment">
					<Input label="Comment">
						<textarea
							rows={2}
							placeholder=""
							className="comment-message"
							value={comment}
							onChange={onEditComment}
							maxLength={MAX_COMMENT_CHAR_COUNT}
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
