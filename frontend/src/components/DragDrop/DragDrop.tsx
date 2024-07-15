import React, { useState } from "react";
import Dropzone from "react-dropzone";

import { useBatchAddListener, useBatchFinishListener } from "@rpldy/uploady";
import {
	FileInvalidEventDetail,
	getErrorMsg,
	itemPreview,
} from "../UploadImage/UploadImage";
import { UploadPreview } from "@rpldy/upload-preview";
import { useCroppedImage } from "../UploadImage/CropperContext";
import { Image } from "../../models/common";
import { useUploady } from "@rpldy/uploady";

import "./DragDrop.css";

const DragDrop = (props: any) => {
	const [filesAdded, setFilesAdded] = useState(false);
	const [inputErrors, setInputErrors] = useState<
		FileInvalidEventDetail[] | null
	>(null);
	const { imageRemotePath, imageType, setImageType } = useCroppedImage();

	const { upload } = useUploady();

	function handleDrop(acceptedFiles: any) {
		//const addedFiles = document.querySelector(".added-files");
		acceptedFiles.forEach((addedFile: any) => {
			upload(addedFile);

			// const file = document.createElement("div");
			// file.className = "added-file";
			// file.innerText = addedFile.name;

			// const closeIcon = document.createElement("img");
			// closeIcon.src = "/icons/close.png";
			// closeIcon.className = "close-icon";
			// closeIcon.onclick = () => {
			// 	file.remove(); // remove element from DOM
			// 	//remove file from acceptedFiles array
			// 	acceptedFiles = acceptedFiles.filter(
			// 		(file: any) => file.name !== addedFile.name,
			// 	);
			// };
			// file.appendChild(closeIcon);

			// addedFiles?.appendChild(file);
		});
	}

	// Throw error if uploaded file is not of image type and bar Uploady from uploading the offending file
	useBatchAddListener((batch) => {
		console.log("batch add listener", batch.items);
		const index = batch.items.findIndex(
			(item) => !item.file.type.startsWith("image/"),
		);

		if (index >= 0) {
			setInputErrors(
				batch.items.map((item) => {
					return {
						file: item.file,
						issues: { accept: true },
					};
				}),
			);
			return false; // Prevents the upload from starting
		} else {
			setImageType(batch.items.map((item) => item.file.type));
			setInputErrors(null);
			setFilesAdded(true);
			return true;
		}
	});

	useBatchFinishListener((batch) => {
		console.log("batch finish listener", batch.items);
		if (imageRemotePath && imageType) {
			const imgs: Image[] = [];
			batch.items.forEach((_, index) => {
				imgs.push({
					contentType: imageType[index],
					path: `${process.env.REACT_APP_STORAGE_URL!}/${imageRemotePath[index]}`,
				});
			});
			props.updateData(imgs);
		}
	});

	return (
		<>
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

			{filesAdded && <UploadPreview PreviewComponent={itemPreview} />}

			{inputErrors &&
				inputErrors.map((error) => (
					<div key={error.file.name} className="error">
						{getErrorMsg(error)}
					</div>
				))}
		</>
	);
};

export default DragDrop;
