import Uploady from '@rpldy/uploady';
import UploadImage from './UploadImage';

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
                <UploadImage images={props.images} updateData={props.updateData} generateImgCb={props.generateImgCb} />
            </Uploady>
        </>
    );
}

export default Uploader;
