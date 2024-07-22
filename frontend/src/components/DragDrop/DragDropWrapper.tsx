import React from "react";
import { CroppedImageProvider } from "../UploadImage/CropperContext";
import DragDropUploader from "./DragDropUploader";

function DragDropWrapper(props: any) {
	return (
		<CroppedImageProvider>
			<DragDropUploader
				images={props.images}
				updateData={props.updateData}
				multiUpload={props.multiUpload}
			/>
		</CroppedImageProvider>
	);
}

export default DragDropWrapper;
