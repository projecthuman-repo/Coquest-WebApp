import { Button, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../../components/ProgressBar/index';
//styles for this page
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
    marginTop: 45,
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
const InputDigitCode = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <ProgressBar index={0} />
            <ButtonsContainer>
                <ButtonBack
                    className='bhEffect'
                    onClick={() => {
                        navigate('/ImproveYourPrivacy');
                    }}
                >
                    {'<'} Back
                </ButtonBack>
                <ButtonNext
                    className='bhEffect'
                    variant='contained'
                    disableElevation
                    onClick={() => {
                        navigate('/ConnectToSocial');
                    }}
                >
                    Next
                </ButtonNext>
            </ButtonsContainer>
            <PrivacyContainer>
                <Text4>Improve your privacy.</Text4>
                <Text2>
                    Opt in to 2 factor authentication to ensure your <br />{' '}
                    account is secure.
                </Text2>
                <Text3>Enter the 4-digit code sent to your phone number.</Text3>
                <TextField
                    sx={{
                        width: 300,
                        marginLeft: 13,
                    }}
                    id='4digitcode'
                    name='4DigitCode'
                    label='4-digit code'
                    placeholder='1111'
                />
            </PrivacyContainer>
        </Container>
    );
};

export default InputDigitCode;
