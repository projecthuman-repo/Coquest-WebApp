import { Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../../components/ProgressBar/index';

//styles for this page
const AlternativeText = styled(Typography)({
    fontFamily: 'Poppins',
    marginTop: 20,
    fontSize: '13px',
    fontWeight: 650,
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
const LinkStyle = styled(link)({
    cursor: 'pointer',
    color: 'rgb(0, 131, 252)',
    textDecoration: 'none',
});
const Container = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column',
    textAlign: 'center',
});
const VerifyContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 600,
    marginTop: 50,
});
const Text2 = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '15px',
    lineHeight: '18px',
    fontWeight: 400,
    color: '#000000',
    marginTop: 20,
});
const Verification = () => {
    //hook for force update
    const [, updateState] = useState(false);
    //fetches email from localstorage
    let email = localStorage.getItem('email');
    //force update function on localstorage
    const forceUpdate = useCallback(() => updateState(true), [email]);
    console.log(email);
    const defaultEmail = 'John@example.com';
    const original = email ? email : defaultEmail;

    //hides a certain number of characters in the email address
    const emailParse = () => {
        let result = '';
        for (let i = 0; i < original.length; i++) {
            if (i < 3) {
                result += '*';
            } else {
                result += original[i];
            }
        }
        return result;
    };
    const navigate = useNavigate();

    return (
        <Container>
            <ProgressBar index={0} />
            <ButtonsContainer>
                <ButtonBack
                    className='bhEffect'
                    onClick={() => {
                        navigate('/Register');
                    }}
                >
                    {'<'} Back
                </ButtonBack>
                <ButtonNext
                    className='bhEffect'
                    variant='contained'
                    disableElevation
                    onClick={() => {
                        navigate('/ImproveYourPrivacy');
                    }}
                >
                    Next
                </ButtonNext>
            </ButtonsContainer>
            <VerifyContainer>
                <h2>Verify your account.</h2>

                <Text2>
                    A confirmation email has been sent to {emailParse()}.
                    <br /> Click the link to confirm your account.
                </Text2>
                <AlternativeText>
                    Didn't recieve an email?{' '}
                    <LinkStyle
                        onClick={() => {
                            navigate('/EmailSendAgain');
                        }}
                    >
                        Send again.
                    </LinkStyle>
                </AlternativeText>
            </VerifyContainer>
        </Container>
    );
};

export default Verification;
