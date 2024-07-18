import React, { useState, useContext, useEffect } from "react";
import { DragDropContext } from "./DragDropContext";
import Dropzone from "react-dropzone";

import {
	useUploady,
	useBatchAddListener,
	useBatchFinishListener,
	withRequestPreSendUpdate,
} from "@rpldy/uploady";
import { UploadPreview } from "@rpldy/upload-preview";

import {
	FileInvalidEventDetail,
	getErrorMsg,
} from "../UploadImage/UploadImage";
import { useCroppedImage } from "../UploadImage/CropperContext";

import CropperComponent from "./DragDropCropper";
import { Image } from "../../models/common";

import "./DragDrop.css";

const itemPreview = withRequestPreSendUpdate(
	({ id, url, updateRequest, requestData }: any) => {
		console.log("itemPreview", id, url, updateRequest, requestData);
		return (
			<div>
				<CropperComponent
					id={id}
					src={url}
					updateRequest={updateRequest}
					requestData={requestData}
				/>
			</div>
		);
	},
);

const DragDrop = (props: any) => {
	const [readyForUpload, setReadyForUpload] = useState(true);
	const { attachments } = useContext(DragDropContext);
	const [inputErrors, setInputErrors] = useState<
		FileInvalidEventDetail[] | null
	>(null);
	const { imageRemotePath, setImageRemotePath, imageType, setImageType } =
		useCroppedImage();

	const { upload } = useUploady();

	function handleDrop(acceptedFiles: any) {
		setReadyForUpload(false);
		upload(acceptedFiles);
	}

	// Throw error if uploaded file is not of image type and bar Uploady from uploading the offending file
	useBatchAddListener((batch) => {
		console.log(batch.items);
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
			if (imageType)
				setImageType([
					...imageType,
					...batch.items.map((item) => item.file.type),
				]);
			else setImageType(batch.items.map((item) => item.file.type));
			setInputErrors(null);
			return true;
		}
	});

	useBatchFinishListener((batch) => {
		console.log("batch items", batch.items);
		console.log("imageRemotePath", imageRemotePath);
		console.log("imageType", imageType);

		if (
			imageRemotePath &&
			imageType &&
			imageRemotePath?.length > 0 &&
			imageType?.length > 0
		) {
			const imgs: Image[] = [];
			batch.items.forEach((_, index) => {
				imgs.push({
					contentType: imageType[index],
					path: `${process.env.REACT_APP_STORAGE_URL!}/${imageRemotePath[index]}`,
				});
			});
			console.log("imgs", imgs);
			props.updateData(attachments.concat(imgs));
			setImageType([]);
			setImageRemotePath([]);
			setReadyForUpload(true);
		}
	});

	useEffect(() => {
		if (!imageType) setImageType([]);
	}, [imageType, readyForUpload]);

	return (
		<>
			{readyForUpload && (
				<div className="dropzone">
					<Dropzone onDrop={handleDrop}>
						{({ getRootProps, getInputProps }) => (
							<section>
								<div
									{...getRootProps({
										onClick: (event) =>
											event.stopPropagation(),
									})}
								>
									<input {...getInputProps()} />
									<img
										src="/icons/upload.png"
										className="upload-icon"
									></img>
									<p>
										<input
											type="file"
											multiple
											id="upload-btn"
											onChange={(e) =>
												handleDrop(e.target.files)
											}
											hidden
										/>
										<label htmlFor="upload-btn">
											<u>Upload</u>
										</label>{" "}
										or drag and drop attachments
									</p>
								</div>
							</section>
						)}
					</Dropzone>
					<div className="added-files">
						{/* // TODO implement so that close icon deletes uploaded file from the server too */}
						{attachments &&
							attachments.length > 0 &&
							attachments.map((attachment, index) => (
								<div
									className="added-file"
									key={attachment.path}
								>
									<img
										src={attachment.path}
										alt="Added file"
									/>
									<img
										src="/icons/close.png"
										className="close-icon"
										onClick={() => {
											const newAttachments =
												attachments.filter(
													(_, i) => i !== index,
												);
											props.updateData(newAttachments);
										}}
									></img>
								</div>
							))}
					</div>
				</div>
			)}

			<UploadPreview
				PreviewComponent={itemPreview}
				onPreviewsChanged={(previews) => {
					console.log("previews", previews);
				}}
			/>

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
