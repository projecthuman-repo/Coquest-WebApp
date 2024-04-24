import UploadWrapper from "../../../../components/UploadImage/UploadWrapper";
import { generateProfileImg } from "../../../../models/usermodel";

function ProfilePicture(props: any) {
    return <UploadWrapper
        images={props.user.images}
        updateData={props.updateData}
        multiUpload={false}
        generateImgCb={generateProfileImg}
    />;
}

export default ProfilePicture;
