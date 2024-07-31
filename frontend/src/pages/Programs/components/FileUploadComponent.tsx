import { Typography } from "@mui/material";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "TXT", "PDF", "DOCX", "ZIP"];
type Props = {
	onFileUpload: (file: any) => void;
};

const FileUploadComponent = ({ onFileUpload }: Props) => {
	const [file, setFile] = useState({
		name: "default",
	});
	const [fileUploaded, setFileUploaded] = useState<boolean>(false);

	const handleChange = (file: any) => {
		setFile(file);
		setFileUploaded(true);
		onFileUpload(file); // call the prop function with the selected file
	};

	return (
		<>
			<FileUploader
				handleChange={handleChange}
				name="file"
				hoverTitle="Drop Image file here"
				types={fileTypes}
				maxSize="10"
				multiple={false}
			/>
			{fileUploaded && (
				<Typography>{file.name} is successfully uploaded.</Typography>
			)}
		</>
	);
};

export default FileUploadComponent;
