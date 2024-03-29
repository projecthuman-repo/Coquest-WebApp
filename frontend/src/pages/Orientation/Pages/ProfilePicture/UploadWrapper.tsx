import { CroppedImageProvider } from './CropperContext';
import ProfilePictureWrapper from "./Uploader";

function UploadWrapper(props: any) {
    return (
        <CroppedImageProvider>
            <ProfilePictureWrapper user={props.user} updateData={props.updateData} />
        </CroppedImageProvider>
    )
}

export default UploadWrapper;
