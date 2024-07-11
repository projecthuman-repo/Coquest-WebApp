import React from "react";
import Dropzone from "react-dropzone";
import "./index.css";

const DragDrop = () => {
	function handleDrop(acceptedFiles: any) {
		const addedFiles = document.querySelector(".added-files");
		acceptedFiles.forEach((addedFile: any) => {
			const file = document.createElement("div");
			file.className = "added-file";
			file.innerText = addedFile.name;

			const closeIcon = document.createElement("img");
			closeIcon.src = "/icons/close.png";
			closeIcon.className = "close-icon";
			closeIcon.onclick = () => {
				file.remove(); // remove element from DOM
				// remove file from acceptedFiles array
				acceptedFiles = acceptedFiles.filter(
					(file: any) => file.name !== addedFile.name,
				);
			};
			file.appendChild(closeIcon);

			addedFiles?.appendChild(file);
		});
	}

	return (
		<div className="dropzone">
			<Dropzone onDrop={handleDrop}>
				{({ getRootProps, getInputProps }) => (
					<section>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<img
								src="/icons/upload.png"
								className="upload-icon"
							></img>
							<p>
								<u>Upload</u> or drag and drop attachments
							</p>
						</div>
					</section>
				)}
			</Dropzone>
			<div className="added-files"></div>
		</div>
	);
};

export default DragDrop;
