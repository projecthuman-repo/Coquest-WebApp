import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import link from '@mui/material/Link';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//styles for this page
const Container = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: 150,
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
const AlternativeText = styled(Typography)({
    fontFamily: 'Poppins',
    marginTop: 20,
    fontSize: '13px',
    fontWeight: 650,
});
const LinkStyle = styled(link)({
    cursor: 'pointer',
    color: 'rgb(0, 131, 252)',
    textDecoration: 'none',
});
const ButtonCancel = styled(Button)({
    backgroundColor: 'rgb(217, 217, 217)',
    color: 'black',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: 16,
    borderRadius: 30,
    height: 40,
    paddingLeft: 40,
    paddingRight: 40,
    marginLeft: 1100,
    marginTop: 120,
});
const EmailSendAgain = () => {
    const navigate = useNavigate();
    const [, updateState] = useState(false);
    let email = localStorage.getItem('email');
    //used to force the update of fetching the email from localstorage
    const forceUpdate = useCallback(() => updateState(true), [email]);
    const defaultEmail = 'John@example.com';
    const original = email ? email : defaultEmail;
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
    return (
        <Container>
            <VerifyContainer>
                <h2>Let's try again...</h2>

                <Text2>
                    A confirmation email has been sent to {emailParse()}.
                    <br /> Click the link to confirm your account.
                </Text2>
                <AlternativeText>
                    if you didn't receive an email after 24 hours <br /> Please{' '}
                    <LinkStyle
                        onClick={() => {
                            navigate('');
                        }}
                    >
                        contact us.
                    </LinkStyle>
                </AlternativeText>
            </VerifyContainer>
            <ButtonCancel
                variant='contained'
                disableElevation
                sx={{
                    ':hover': {
                        bgcolor: 'rgb(233, 233, 233)',
                        color: 'black',
                    },
                }}
                onClick={() => {
                    navigate('/login');
                }}
            >
                Cancel
            </ButtonCancel>
        </Container>
    );
};
export default EmailSendAgain;
