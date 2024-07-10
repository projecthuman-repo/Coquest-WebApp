import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import Input from "../../components/Input";
import DragDrop from "../../components/DragDrop";
import "./Create.css";

function CreatePost() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const MAX_CHAR_COUNT = 2000; // TODO: Change this to Coquest post description character limit

	const navigate = useNavigate();

	function onEditTitle(e: React.ChangeEvent<HTMLInputElement>) {
		const newTitle = e.target.value;
		setTitle(newTitle);
	}

	function onEditDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const newDescription = e.target.value;
		setDescription(newDescription);
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
						maxLength={MAX_CHAR_COUNT}
					></textarea>
					<small className="char-count">
						{description.length}&nbsp;/&nbsp;{MAX_CHAR_COUNT}
					</small>
				</Input>

				<DragDrop />

				<div className="create-post-btns-container">
					<div className="create-post-btns">
						<SecondaryButton
							name="Cancel"
							onClick={() => navigate("/posts")}
						/>

						{/* TODO: Figure out where to redirect after post created */}
						<PrimaryButton name="Post" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreatePost;
