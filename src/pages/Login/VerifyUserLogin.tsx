import { Button, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
//styles for this page
const ButtonContinue = styled(Button)({
    backgroundColor: 'rgb(217, 217, 217)',
    color: 'black',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: 16,
    borderRadius: 30,
    height: 40,
    width: 150,
    marginTop: 30,
    marginLeft: 170,
});
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
    marginTop: 160,
});
const Text = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '15px',
    lineHeight: '18px',
    fontWeight: 550,
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
const VerifyUserLogin = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <PrivacyContainer>
                <Text4>Verify It's you.</Text4>
                <Text3>
                    An authenticator code has been sent to .... The <br />
                    code is valid for 15 minutes.
                </Text3>

                <TextField
                    sx={{
                        width: 300,
                        marginLeft: 13,
                    }}
                    id='6digitcode'
                    name='6DigitCode'
                    label='6-digit code'
                    placeholder='123456'
                />
                <ButtonContinue
                    variant='contained'
                    disableElevation
                    sx={{
                        ':hover': {
                            bgcolor: 'rgb(233, 233, 233)',
                            color: 'black',
                        },
                    }}
                    onClick={() => {
                        navigate('/DashBoard');
                    }}
                >
                    <Text>Continue</Text>
                </ButtonContinue>
            </PrivacyContainer>
        </Container>
    );
};

export default VerifyUserLogin;
