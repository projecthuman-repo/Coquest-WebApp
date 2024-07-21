import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import Input from "../../components/Input";
import DragDropWrapper from "../../components/DragDrop/DragDropWrapper";
import { PostFeedContext } from "./PostFeedContext";
import { DragDropContextProvider } from "../../components/DragDrop/DragDropContext";
import { Image } from "../../models/common";
import "./Create.css";

function CreatePost() {
	const { user } = useContext(PostFeedContext);
	const { posts, setPosts } = useContext(PostFeedContext);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	// should be array of Image objects, typeof should be array
	const [attachments, setAttachments] = useState<Image[]>([]);
	const [readyToPost, setReadyToPost] = useState(false);

	const MAX_DESCRIPTION_CHAR_COUNT = 2000; // TODO: Change this to Coquest post description character limit

	const navigate = useNavigate();

	useEffect(() => {
		if (
			title.length > 0 &&
			description.length > 0 &&
			attachments.length > 0
		) {
			setReadyToPost(true);
		} else {
			setReadyToPost(false);
		}
	}, [title, description, attachments]);

	function onEditTitle(e: React.ChangeEvent<HTMLInputElement>) {
		const newTitle = e.target.value;
		setTitle(newTitle);
	}

	function onEditDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const newDescription = e.target.value;
		setDescription(newDescription);
	}

	function handleCreatePost() {
		if (readyToPost) {
			const newPost = {
				userID: user?.id,
				title,
				description,
				likes: 0,
				attachments: attachments,
				createdAt: new Date().toISOString(),
				comments: [],
			};

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

				<DragDropContextProvider
					attachments={attachments}
					setAttachments={setAttachments}
				>
					<DragDropWrapper
						images={attachments}
						updateData={setAttachments}
						multiUpload={true}
					/>
				</DragDropContextProvider>

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
