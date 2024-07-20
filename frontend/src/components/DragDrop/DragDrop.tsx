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
			props.updateData(attachments.concat(imgs));
			setImageType([]);
			setImageRemotePath([]);
			setReadyForUpload(true);
		}
	});

	useEffect(() => {
		if (!imageType) setImageType([]);
	}, [imageType, readyForUpload, setImageType]);

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
										alt="Upload icon"
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
										alt="Close icon"
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

			<UploadPreview PreviewComponent={itemPreview} />

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
