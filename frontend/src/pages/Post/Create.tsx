import React from "react";
import Dropzone from "react-dropzone";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import "./Create.css";

function CreatePost() {
	const [title, setTitle] = React.useState("");
	const [description, setDescription] = React.useState("");
	const MAX_CHAR_COUNT = 2000; // TODO: Change this to Coquest post description character limit

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
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={onEditTitle}
				/>
				<textarea
					placeholder="Description"
					value={description}
					onChange={onEditDescription}
					maxLength={MAX_CHAR_COUNT}
				></textarea>

				<div className="dropzone">
					<Dropzone
						onDrop={(acceptedFiles) => console.log(acceptedFiles)}
					>
						{({ getRootProps, getInputProps }) => (
							<section>
								<div {...getRootProps()}>
									<input {...getInputProps()} />
									<img
										src="/icons/upload.png"
										className="upload-icon"
									></img>
									<p>
										<u>Upload</u> or drag and drop
										attachments
									</p>
								</div>
							</section>
						)}
					</Dropzone>
				</div>

				<div className="create-post-btns-container">
					<div className="create-post-btns">
						<SecondaryButton name="Cancel" />
						<PrimaryButton name="Post" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreatePost;
