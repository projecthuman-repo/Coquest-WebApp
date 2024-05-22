import UploadWrapper from "../../../components/UploadImage/UploadWrapper";
import { generateProfileImg } from "../../../models/usermodel";
import '../Orientation.css';
import './ProfilePicture.css';

function ProfilePicture(props: any) {
    return (
    <>
    <h3 className="main-heading">Say Cheese!</h3>
    <br />
    <p className="sub-heading">Upload a custom profile picture or generate one using our tools.</p>
    <br />
    <UploadWrapper images={props.user.images} updateData={props.updateData} multiUpload={false} generateImgCb={generateProfileImg} />
    </>
    );
}

export default ProfilePicture;
