import { useCallback, useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import Cropper, { ReactCropperElement } from 'react-cropper';
import { useCroppedImage } from './CropperContext';
import "cropperjs/dist/cropper.css";
import { Button } from '@mui/material';
import { gql } from 'graphql-request';
import graphQLClient from '../../apiInterface/client';

const CROP_WIDTH = 175; 
const CROP_HEIGHT = 175;

const CropContainer = styled.div`
margin: auto;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
`;

const PreviewImage = styled.img`
margin: auto;
max-width: ${CROP_WIDTH}px;
max-height: ${CROP_HEIGHT}px;
height: auto;
border-radius: 50%;
`;

const document = gql`
    {
        generatePresignedURL
    }
`;

function CropperComponent({id, src, updateRequest, requestData}: any) {
    const cropperRef = useRef<ReactCropperElement>(null);
    const [index, setIndex] = useState(-1);
    const [uploadedState, setUploadedState] = useState(false);
    const { imageUrl, setImageUrl, imageType, setImageRemotePath, imageRemotePath } = useCroppedImage();

    // TODO: Move signed URL generation to the uploading functionality
    async function generateUrl() {
        try {
            const data: any = await graphQLClient.request(document);
            let url = new URL(data.generatePresignedURL);
            if(imageRemotePath) {
                let tmp = [...imageRemotePath];
                // Remove leading forward slash
                tmp.push(url.pathname.substring(1));
                setImageRemotePath(tmp);
            } else {
                setImageRemotePath([url.pathname.substring(1)]);
            }
            return url.href;
    
        } catch(error) {
            console.error(error)
        }
    }

    // Resume the uploading process with the users crop selection 
    const onCropUpload = useCallback(() => {
        const cropper = cropperRef.current?.cropper;

        if(cropper && requestData.items) {
            let index = +(id.substring(id.length - 1));
            setIndex(index);
            let file = requestData.items[0];

            if(imageType) {
                const urls = imageUrl ? [...imageUrl] : [];
                // Pass the image type to HTMLCanvasElement.toDataURL to prevent enlarging the image
                // https://github.com/fengyuanchen/cropperjs?tab=readme-ov-file#known-issues
                urls[index] = cropper.getCroppedCanvas().toDataURL(imageType[index] ?? undefined);
                setImageUrl(urls);
                setUploadedState(true);

                cropper.getCroppedCanvas({
                    rounded: true,
                    imageSmoothingEnabled: true,
                    imageSmoothingQuality: 'high',
                }).toBlob((blob: Blob | null) => {
                    if(blob) {
                        const croppedFile = new File([blob], file.name, {type: imageType[index] ?? undefined});
                        requestData.items[0].file = croppedFile;
                        generateUrl().then(url => {
                            updateRequest({ items: requestData.items, 
                                options: {
                                    destination: {
                                        url: url 
                                    }
                                }
                            });
                        });
                    }
                }, imageType[index] ?? undefined);
            }
        }
    }, [updateRequest, requestData, setImageUrl, imageType]);

    return (
        <CropContainer>
            {!uploadedState &&
                <>
                    <Cropper
                        style={{
                            // Limit size of container
                            maxHeight: '20em'
                        }}
                        initialAspectRatio={CROP_WIDTH / CROP_HEIGHT}
                        aspectRatio={CROP_WIDTH / CROP_HEIGHT}
                        src={src}
                        // Automatically display a crop area at the centre of the image, covering the input percentage
                        autoCropArea={0.3}
                        background={true}
                        modal={true}
                        zoomable={false}
                        ref={cropperRef}
                    />

                    {/* Button to preview selection */}
                    <Button onClick={onCropUpload}>Upload Selection</Button>
                </>
            }

            {/* Fill full-size preview container with the default fill colour, black */}
            {imageUrl && uploadedState &&
                <div style={{
                    position: 'relative',
                    width: CROP_WIDTH,
                    height: CROP_HEIGHT,
                    }}>
    
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        // Exactly centres the image
                        transform: 'translate(-50%, -49.5%)',
                        }}>
                        <PreviewImage src={imageUrl[index]} alt='Cropped upload' />
                    </div>
                </div>
            }

        </CropContainer>
    );
}

export default CropperComponent;