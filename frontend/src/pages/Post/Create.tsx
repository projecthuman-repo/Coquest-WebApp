import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import Input from "../../components/Input";
import DragDrop from "../../components/DragDrop";
import { PostFeedContext } from "./PostFeedContext";
import "./Create.css";

function CreatePost() {
	const { user } = useContext(PostFeedContext);
	const { posts, setPosts } = useContext(PostFeedContext);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [readyToPost, setReadyToPost] = useState(false);

	const MAX_DESCRIPTION_CHAR_COUNT = 2000; // TODO: Change this to Coquest post description character limit

	const navigate = useNavigate();

	useEffect(() => {
		if (title.length > 0 && description.length > 0) {
			setReadyToPost(true);
		} else {
			setReadyToPost(false);
		}
	}, [title, description]);

	function onEditTitle(e: React.ChangeEvent<HTMLInputElement>) {
		const newTitle = e.target.value;
		setTitle(newTitle);
	}

	function onEditDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const newDescription = e.target.value;
		setDescription(newDescription);
	}

	// TODO handle attachments

	function handleCreatePost() {
		if (readyToPost) {
			const newPost = {
				userID: user?.id,
				title,
				description,
				likes: 0,
				attachments: [],
				createdAt: new Date().toISOString(),
				comments: [],
			};
			console.log(newPost);

			setPosts([newPost, ...posts]);

			// TODO save new post to database

			navigate("/posts");
		}
	}

	return (
		<div className="create-post">
			<h2 className="center">Create Post</h2>
			<div className="create-post-form">
				<Input label="Title">
					<input
						type="text"
						placeholder=""
						value={title}
						onChange={onEditTitle}
					/>
				</Input>

				<Input label="Description">
					<textarea
						placeholder=""
						value={description}
						onChange={onEditDescription}
						maxLength={MAX_DESCRIPTION_CHAR_COUNT}
					></textarea>
					<small className="char-count">
						{description.length}&nbsp;/&nbsp;
						{MAX_DESCRIPTION_CHAR_COUNT}
					</small>
				</Input>

				<DragDrop />

				<div className="create-post-btns-container">
					<div className="create-post-btns">
						<SecondaryButton
							name="Cancel"
							onClick={() => navigate("/posts")}
						/>

						<PrimaryButton
							name="Post"
							type={readyToPost ? "" : "muted"}
							onClick={handleCreatePost}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreatePost;
