import { Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../../components/ProgressBar/index';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import TextField from '@mui/material/TextField';
//styles for this page
const BallStyleCheck = styled(RiCheckboxCircleFill)({
    color: 'rgb(70, 184, 95)',
    width: 25,
    height: 25,
    float: 'left',
    marginTop: -4,
    marginRight: 13,
    padding: 0,
});
const EmailVerified = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
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
const PrivacyContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 500,
    marginTop: 5,
});
const Text = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '15px',
    lineHeight: '18px',
    fontWeight: 400,
    color: '#000000',
});
const Text2 = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '17px',
    lineHeight: '18px',
    fontWeight: 500,
    color: '#000000',
});
const Text3 = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '15px',
    lineHeight: '18px',
    fontWeight: 400,
    color: '#000000',
    marginTop: 20,
    marginBottom: 30,
});
const Text4 = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '23px',
    lineHeight: '18px',
    fontWeight: 600,
    color: '#000000',
    marginTop: 20,
    marginBottom: 30,
});
const LinkStyle = styled(link)({
    cursor: 'pointer',
    color: 'black',
    marginLeft: 250,
    marginTop: 15,
    textDecorationColor: 'black',
});
const ImproveYourPrivacy = () => {
    const [isVerified, setisVerified] = useState(true);
    //this is to check the database to see if user has been verified
    const checkEmail = () => {
        //code for checking the database for if the user has passed the verification process for their email address
        if (true) {
            setisVerified(true);
        }
    };
    const navigate = useNavigate();
    return (
        <Container>
            <ProgressBar index={0} />
            <ButtonsContainer>
                <ButtonBack
                    className='bhEffect'
                    onClick={() => {
                        navigate('/Verification');
                    }}
                >
                    {'<'} Back
                </ButtonBack>
                <ButtonNext
                    variant='contained'
                    disableElevation
                    className='bhEffect'
                    onClick={() => {
                        navigate('/InputDigitCode');
                    }}
                >
                    Next
                </ButtonNext>
            </ButtonsContainer>
            <EmailVerified
                style={isVerified ? { display: 'inline' } : { display: 'none' }}
            >
                <Text>
                    {' '}
                    <BallStyleCheck />
                    Your account has been verified.
                </Text>
            </EmailVerified>
            <PrivacyContainer>
                <Text4>Improve your privacy.</Text4>
                <Text2>
                    Opt in to 2 factor authentication to ensure your <br />{' '}
                    account is secure.
                </Text2>
                <Text3>
                    A 4-digit code will be sent to your phone number <br /> when
                    signing in.
                </Text3>
                <TextField
                    sx={{
                        width: 300,
                        marginLeft: 13,
                    }}
                    id='phone_number'
                    name='Phonenumber'
                    label='Phone number'
                    placeholder='000-000-000'
                />
                <LinkStyle
                    onClick={() => {
                        navigate('/ConnectToSocial');
                    }}
                >
                    Skip
                </LinkStyle>
            </PrivacyContainer>
        </Container>
    );
};

export default ImproveYourPrivacy;
