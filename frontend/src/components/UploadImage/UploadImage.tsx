import { useBatchAddListener, useBatchFinishListener, withRequestPreSendUpdate } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { useState } from "react";
import { FileLike } from "@rpldy/shared";
import { UploadPreview } from "@rpldy/upload-preview"
import styled from "styled-components";
import { Button } from "@mui/material";
import CropperComponent from "./Cropper";
import { useCroppedImage } from "./CropperContext";
import { Image } from "../../models/common";

const CenterContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

// Error type with similiar shape to the error type Uploady expects in its error-handling callback functions
interface FileInvalidEventDetail {
    file: FileLike; // The File object that was attempted to be uploaded
    issues: {
        [key: string]: boolean; // A map of issues encountered with the file, e.g., type, size
    };
}

function getErrorMsg(err: FileInvalidEventDetail) {
    let msg = '';
    if(err) {
        msg += `Could not upload ${err.file.name}: `;

        if(err.issues.accept) {
            msg += `invalid file type. Only image files are acceptable.`;
        } else if(err.issues.size) {
            msg += `file too large.`;
        } else {
            // TODO: Report other possible errors
            msg += `Unknown error`;
        }
    }
    return msg;
}

// Image Pre-processing
const itemPreview = withRequestPreSendUpdate(({id, url, updateRequest, requestData }: any) => {
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
});

function UploadImage(props: any) {
    const [filesAdded, setFilesAdded] = useState(false);
    const [imgCropped, setImgCropped] = useState(false);
    const [images, setImages] = useState(props.images);
    const [inputErrors, setInputErrors] = useState<FileInvalidEventDetail[] | null>(null);
    const { imageRemotePath, imageType, setImageType } = useCroppedImage();

    // Throw error if uploaded file is not of image type and bar Uploady from uploading the offending file
    useBatchAddListener((batch) => {
        const index = batch.items.findIndex((item) => 
            !item.file.type.startsWith("image/")
        );
        
        if (index >= 0) {
            setInputErrors(batch.items.map(item => {
                return {
                    file: item.file,
                    issues: {accept: true}
                };
            }));
            return false; // Prevents the upload from starting
        } else {
            setImageType(batch.items.map(item => item.file.type));
            setInputErrors(null);
            setFilesAdded(true);
            return true;
        }
    });

    useBatchFinishListener((batch) => {
        // If imageRemotePath is null, useRequestPreSend has failed
        if(imageRemotePath && imageType) {
            let imgs: Image[] = [];
            batch.items.forEach((_, index) => {
                imgs.push({ contentType: imageType[index], path: `${process.env.REACT_APP_STORAGE_URL!}/${imageRemotePath[index]}` });
            });
            props.updateData(imgs);
        }
    });

    function generateImg() {
        const images = [props.generateImgCb()];

        setImages(images);
        props.updateData(images);
    }

    return (
        <CenterContainer>
            
            <UploadButton  />

            {!filesAdded ?
                <>
                    <img 
                        src={images[0].path}
                        alt="generated img" 
                        style={{ height: '175px' }}
                    /> 
                    <Button onClick={generateImg}>Generate New Image</Button>
                </> :
                <UploadPreview
                    PreviewComponent={itemPreview}
                />
            }

            {inputErrors && inputErrors.map(error => 
                <div key={error.file.name} style={{ backgroundColor: 'rgba(255, 0, 0, 0.3)', padding: '16px', borderRadius: '5px'}}>
                    {getErrorMsg(error)}
                </div>
            )}
        </CenterContainer>
    );
}

export default UploadImage;
