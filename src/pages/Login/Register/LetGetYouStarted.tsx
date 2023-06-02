import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../../components/ProgressBar/index';
import { FaCamera } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
const randomImage =
    'https://source.unsplash.com/1600x900/?nature,photography,technology';

const BallStyleProfileContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '',
    borderRadius: 90,
    width: 145,
    height: 145,
    backgroundColor: 'white',
    marginTop: 110,
    marginLeft: 70,
});
const BallStyleProfile = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '',
    borderRadius: 90,
    width: 135,
    height: 135,
    backgroundSize: 'cover',
});
const ButtonBack = styled(Button)({
    color: 'black',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: 16,
    borderRadius: 30,
    marginLeft: 25,
    height: 40,
    padding: 0,
    marginRight: 25,
});
const ButtonNext = styled(Button)({
    backgroundColor: 'rgb(217, 217, 217)',
    color: 'black',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: 16,
    borderRadius: 30,
    height: 40,
    paddingLeft: 40,
    paddingRight: 40,
    marginRight: 25,
});
const ButtonsContainer = styled.div`
    & :hover.bhEffect {
        background-color: rgb(233, 233, 233);
        color: black;
    }
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: 20px;
    margin-right: 100px;
`;
const Container = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column',
    textAlign: 'center',
});
const BodyContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 800,
});
//image will be assigned to backgrounImage
const BackgroundImgContainer = styled.div({
    display: 'flex',
    width: 800,
    height: 170,
    backgroundSize: '800px 170px',
    backgroundRepeat: 'no-repeat',
    border: '1px solid red',
});
const CameraIcon = styled(FaCamera)({
    width: 25,
    height: 25,
    color: 'rgb(104,104,104)',
});
const Text3 = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '15px',
    lineHeight: '18px',
    fontWeight: 400,
    color: '#000000',
    marginBottom: 30,
});
const Text4 = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '23px',
    lineHeight: '18px',
    fontWeight: 600,
    color: '#000000',
    marginBottom: 25,
});
const FieldContainer = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    fullwidth: true,
});
const LetGetYouStarted = () => {
    const navigate = useNavigate();

    //image uploader
    const [selectedImage, setSelectedImage] = useState(null);
    return (
        <Container>
            <ProgressBar index={2} />
            <ButtonsContainer>
                <ButtonBack
                    className='bhEffect'
                    onClick={() => {
                        navigate('/ConnectToSocial');
                    }}
                >
                    {'<'} Back
                </ButtonBack>
                <ButtonNext
                    className='bhEffect'
                    variant='contained'
                    disableElevation
                    onClick={() => {
                        navigate('/WhyAreYouHere');
                    }}
                >
                    Next
                </ButtonNext>
            </ButtonsContainer>
            <BodyContainer>
                <Text4>Let's get started.</Text4>
                <Text3>build your profile</Text3>
                <BackgroundImgContainer
                    style={{
                        backgroundImage: `url(${randomImage})`,
                    }}
                >
                    <BallStyleProfileContainer>
                        <BallStyleProfile
                            style={{
                                backgroundImage: `url(${randomImage})`,
                            }}
                        >
                            <Button
                                variant='contained'
                                component='label'
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '',
                                    borderRadius: 40,
                                    marginTop: 70,
                                    marginLeft: 130,
                                    minHeight: 50,
                                    minWidth: 50,
                                    backgroundColor: 'rgb(244, 244, 244)',
                                }}
                                sx={{
                                    ':hover': {
                                        bgcolor: 'rgb(233, 233, 233)',
                                        color: 'black',
                                    },
                                }}
                            >
                                <input hidden accept='image/*' type='file' />
                                <CameraIcon />
                            </Button>
                        </BallStyleProfile>
                    </BallStyleProfileContainer>
                    <Button
                        variant='contained'
                        component='label'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '',
                            borderRadius: 40,
                            marginTop: 115,
                            marginLeft: 530,
                            marginBottom: 5,
                            backgroundColor: 'rgb(244, 244, 244)',
                            minHeight: 40,
                            minWidth: 50,
                        }}
                        sx={{
                            ':hover': {
                                bgcolor: 'rgb(233, 233, 233)',
                                color: 'black',
                            },
                        }}
                    >
                        <input hidden accept='image/*' type='file' />
                        <CameraIcon />
                    </Button>
                </BackgroundImgContainer>
                <FieldContainer>
                    <TextField
                        sx={{
                            width: 500,
                            marginTop: 10,
                            marginRight: 2,
                        }}
                        id='Location'
                        name='location'
                        label='Location'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <MdLocationPin
                                        style={{ height: 25, width: 25 }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        sx={{
                            width: 500,
                            marginTop: 10,
                        }}
                        InputProps={{ sx: { height: 150 } }}
                        id='Bio'
                        name='bio'
                        label='Write your bio'
                    />
                </FieldContainer>
            </BodyContainer>
        </Container>
    );
};

export default LetGetYouStarted;
