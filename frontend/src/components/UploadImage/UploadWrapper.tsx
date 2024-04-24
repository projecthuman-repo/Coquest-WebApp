import { CroppedImageProvider } from './CropperContext';
import UploadImageWrapper from "./Uploader";

function UploadWrapper(props: any) {
    return (
        <CroppedImageProvider>
            <UploadImageWrapper images={props.images} updateData={props.updateData} multiUpload={props.multiUpload} generateImgCb={props.generateImgCb} />
        </CroppedImageProvider>
    )
}

export default UploadWrapper;
