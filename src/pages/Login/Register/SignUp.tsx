import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import link from '@mui/material/Link';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import {
    RiFacebookFill,
    RiGoogleFill,
    RiInstagramLine,
    RiTwitterFill,
} from 'react-icons/ri';
import { Typography } from '@mui/material';
import ProgressBar from '../../../components/ProgressBar/index';

//styles for this page
const LinkStyle = styled(link)({
    cursor: 'pointer',
    color: 'rgb(0, 131, 252)',
    textDecoration: 'none',
});
const SocialIconContainer = styled.div({
    display: 'flex',
    gap: 20,
    justifyContent: 'center',
});
const IconContainer = styled(Button)({
    height: 50,
    minWidth: 50,
    backgroundColor: 'rgb(217, 217, 217)',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    color: 'black',
});
const FacebookIconStyle = styled(RiFacebookFill)({
    height: 50,
    width: 50,
});
const InstagramIconStyle = styled(RiInstagramLine)({
    height: 50,
    width: 50,
});
const TwitterIconStyle = styled(RiTwitterFill)({
    height: 50,
    width: 50,
});
const GoogleIconStyle = styled(RiGoogleFill)({
    height: 50,
    width: 50,
});
const DividerStyle = styled(Divider)({
    minWidth: '100%',
    marginBottom: 20,
    borderColor: 'black',
    color: 'black',
});
const Text2 = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '15px',
    lineHeight: '18px',
    fontWeight: 400,
    color: '#000000',
});
const AlternativeText = styled(Typography)({
    fontFamily: 'Poppins',
    marginTop: 20,
    fontSize: '13px',
    fontWeight: 650,
});
const Container = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column',
    textAlign: 'center',
});
const SignUpContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 400,
    gap: 20,
});
const Text = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: 24,
    lineHeight: '18px',
    fontWeight: 500,
    color: '#000000',
    justifyContent: 'center',
});
const defaultValues = {
    fullname: '',
    email: '',
    username: '',
    password: '',
};
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
function SignUp() {
    const navigate = useNavigate();

    //SignUp details
    const [formValues, setFormValues] = useState(defaultValues);
    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        console.log(value);
        setFormValues({
            ...formValues,
            [name]: value,
        });
        if (name === 'email') {
            localStorage.setItem('email', value);
        }
        console.log(formValues);
    };
    return (
        <Container>
            <ProgressBar index={0} />
            <ButtonsContainer>
                <ButtonBack
                    className='bhEffect'
                    onClick={() => {
                        navigate('/Login');
                    }}
                >
                    {'<'} Back
                </ButtonBack>
                <ButtonNext
                    className='bhEffect'
                    variant='contained'
                    disableElevation
                    onClick={() => {
                        navigate('/Verification');
                    }}
                >
                    Next
                </ButtonNext>
            </ButtonsContainer>
            <SignUpContainer>
                <Text>Sign up with social media</Text>

                <SocialIconContainer>
                    <IconContainer
                        sx={{
                            ':hover': {
                                bgcolor: 'rgb(233, 233, 233)',
                                color: 'black',
                            },
                        }}
                    >
                        <FacebookIconStyle />
                    </IconContainer>
                    <IconContainer
                        sx={{
                            ':hover': {
                                bgcolor: 'rgb(233, 233, 233)',
                                color: 'black',
                            },
                        }}
                    >
                        <InstagramIconStyle />
                    </IconContainer>
                    <IconContainer
                        sx={{
                            ':hover': {
                                bgcolor: 'rgb(233, 233, 233)',
                                color: 'black',
                            },
                        }}
                    >
                        <TwitterIconStyle />
                    </IconContainer>
                    <IconContainer
                        sx={{
                            ':hover': {
                                bgcolor: 'rgb(233, 233, 233)',
                                color: 'black',
                            },
                        }}
                    >
                        <GoogleIconStyle />
                    </IconContainer>
                </SocialIconContainer>
                <DividerStyle
                    sx={{
                        '&::before, &::after': {
                            borderColor: 'black',
                        },
                    }}
                >
                    <Text2>or sign up with your email</Text2>
                </DividerStyle>
                <TextField
                    name='fullname'
                    label='Full name'
                    variant='outlined'
                    onChange={handleInputChange}
                />
                <TextField
                    name='email'
                    label='Email'
                    variant='outlined'
                    onChange={handleInputChange}
                />
                <TextField
                    name='username'
                    label='Username'
                    variant='outlined'
                    onChange={handleInputChange}
                />
                <TextField
                    name='password'
                    label='Password'
                    variant='outlined'
                    type='password'
                    onChange={handleInputChange}
                />
                <AlternativeText>
                    Already have an account?{' '}
                    <LinkStyle
                        onClick={() => {
                            navigate('/Login');
                        }}
                    >
                        Sign in.
                    </LinkStyle>
                </AlternativeText>
            </SignUpContainer>
        </Container>
    );
}

export default SignUp;
