import React from "react";
import Uploady from "@rpldy/uploady";
import DragDrop from "./DragDrop";

function Uploader(props: any) {
	return (
		<>
			{/* Writable signed endpoints expect PUT requests, not POST requests */}
			<Uploady
				accept="image/*"
				multiple={props.multiUpload}
				method="PUT"
				sendWithFormData={false}
			>
				<DragDrop images={props.images} updateData={props.updateData} />
			</Uploady>
		</>
	);
}

export default Uploader;
