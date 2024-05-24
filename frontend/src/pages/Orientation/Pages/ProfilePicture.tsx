import UploadWrapper from "../../../components/UploadImage/UploadWrapper";
import { generateProfileImg } from "../../../models/usermodel";
import '../Orientation.css';

function ProfilePicture(props: any) {
    return (
    <>
        <h3 className="main-heading">Add a profile photo.</h3>
        <br />
        <p className="sub-heading">Upload a custom profile picture or generate one using our tools.</p>
        <br />
        <br />
        <UploadWrapper className="profile-image" images={props.user.images} updateData={props.updateData} multiUpload={false} generateImgCb={generateProfileImg} />
    </>
    );
}

export default ProfilePicture;
