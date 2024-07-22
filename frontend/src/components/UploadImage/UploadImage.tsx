import {
	useBatchAddListener,
	useBatchFinishListener,
	withRequestPreSendUpdate,
} from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import React, { useState } from "react";
import { FileLike } from "@rpldy/shared";
import { UploadPreview } from "@rpldy/upload-preview";
import styled from "styled-components";
import { Button } from "@mui/material";
import CropperComponent from "./Cropper";
import { useCroppedImage } from "./CropperContext";
import { Image } from "../../models/common";
import "./UploadImage.css";

const CenterContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

// Error type with similiar shape to the error type Uploady expects in its error-handling callback functions
export interface FileInvalidEventDetail {
	file: FileLike; // The File object that was attempted to be uploaded
	issues: {
		[key: string]: boolean; // A map of issues encountered with the file, e.g., type, size
	};
}

export function getErrorMsg(err: FileInvalidEventDetail) {
	let msg = "";
	if (err) {
		msg += `Could not upload ${err.file.name}: `;

		if (err.issues.accept) {
			msg += `invalid file type. Only image files are acceptable.`;
		} else if (err.issues.size) {
			msg += `file too large.`;
		} else {
			// TODO: Report other possible errors
			msg += `Unknown error`;
		}
	}
	return msg;
}

// Image Pre-processing
// add setImages to the props
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

function UploadImage(props: any) {
	const [filesAdded, setFilesAdded] = useState(false);
	const [images, setImages] = useState(props.images);
	const [inputErrors, setInputErrors] = useState<
		FileInvalidEventDetail[] | null
	>(null);
	const { imageRemotePath, imageType, setImageType } = useCroppedImage();
	// Prevents the user from uploading/generating a new image while the current image is being processed
	// For the clear user experience, many buttons confuse the user
	const [displayImgBtns, setDisplayImgBtns] = useState(true);

	// Throw error if uploaded file is not of image type and bar Uploady from uploading the offending file
	useBatchAddListener((batch) => {
		setDisplayImgBtns(false);
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
			setDisplayImgBtns(true);
			return false; // Prevents the upload from starting
		} else {
			setImageType(batch.items.map((item) => item.file.type));
			setInputErrors(null);
			setFilesAdded(true);
			return true;
		}
	});

	useBatchFinishListener((batch) => {
		// If imageRemotePath is null, useRequestPreSend has failed
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
		setDisplayImgBtns(true);
	});

	function generateImg() {
		setFilesAdded(false);
		const images = [props.generateImgCb()];

		setImages(images);
		props.updateData(images);
	}

	return (
		<CenterContainer>
			{displayImgBtns && (
				<Button onClick={generateImg}>Generate New Image</Button>
			)}

			{!filesAdded ? (
				<>
					<img
						src={images[0].path}
						alt="generated img"
						style={{ height: "175px", borderRadius: "50%" }}
					/>
				</>
			) : (
				<UploadPreview PreviewComponent={itemPreview} />
			)}

			{displayImgBtns && (
				<div className="outline-btn">
					<UploadButton />
				</div>
			)}

			{inputErrors &&
				inputErrors.map((error) => (
					<div key={error.file.name} className="error">
						{getErrorMsg(error)}
					</div>
				))}
		</CenterContainer>
	);
}

export default UploadImage;
