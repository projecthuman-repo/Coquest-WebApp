import { useState, Fragment, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

import {
    RiGoogleFill,
    RiTwitterFill,
    RiInstagramLine,
    RiFacebookFill,
} from 'react-icons/ri';
import {
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import Card from '@mui/material/Card';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FacebookLogin from '@greatsumini/react-facebook-login';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import link from '@mui/material/Link';

//styles for this page
const BallStyle1 = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    borderRadius: 1000,
    width: 120,
    height: 120,
    backgroundColor: 'rgb(217, 217, 217)',
    float: 'right',
    marginRight: 100,
    marginTop: -40,
});
const BallStyle2 = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    borderRadius: 1000,
    width: 168,
    height: 169,
    backgroundColor: 'rgb(217, 217, 217)',
    float: 'right',
    marginTop: 60,
    marginRight: -30,
});
const BallStyle3 = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    borderRadius: 1000,
    width: 268,
    height: 268,
    backgroundColor: 'rgb(217, 217, 217)',
    float: 'right',
    marginTop: 60,
    marginRight: 20,
});
const SideArrow = styled.div({
    borderTop: '250px solid transparent',
    borderRight: '400px solid rgb(217, 217, 217)',
    borderBottom: '250px solid transparent',
    position: 'absolute',
    bottom: 0,
    right: 0,
});
const UpArrow = styled.div({
    borderLeft: '90px solid transparent',
    borderRight: '350px solid transparent',
    borderBottom: '220px solid rgb(217, 217, 217)',
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: '60px',
});
const Container = styled.div({
    width: '100%',
    height: '100%',
});
const CardStyle = styled(Card)({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: 580,
    width: 500,
    marginLeft: 100,
    marginTop: 40,
});
const CompanyLogo = styled.div({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgb(217, 217, 217)',
    justifyContent: 'center',
    height: 90,
    width: 280,
    marginTop: 40,
    marginBottom: 20,
});
const Text = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: 700,
    color: '#000000',
});
const Text2 = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '15px',
    lineHeight: '18px',
    fontWeight: 400,
    color: '#000000',
});
const LoginContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '10px',
    minWidth: 380,
});
const ButtonStyle = styled(Button)`
    background-color: rgb(217, 217, 217);
    variant: contained;
    color: black;
    font-weight: 510px;
    text-transform: none;
    font-size: 16px;
    border-radius: 30px;
    margin-top: 10px;
    margin-right: 10px;
`;
const ButtonContainer = styled.div`
    & :hover.bhEffect {
        background-color: rgb(233, 233, 233);
        color: black;
    }
`;
const BoxContainer = styled(Box)({
    minWidth: '100%',
});
const DividerStyle = styled(Divider)({
    minWidth: '100%',
    marginBottom: 20,
    borderColor: 'black',
    color: 'black',
});
const SocialIconContainer = styled.div({
    display: 'flex',
    gap: 20,
    justifyContent: 'center',
});
const IconContainer = styled(Button)({
    display: 'flex',
    height: 50,
    minWidth: 50,
    backgroundColor: 'rgb(217, 217, 217)',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
});
const FacebookIconStyle = styled(RiFacebookFill)({
    minWidth: 40,
    height: 40,
});
const InstagramIconStyle = styled(RiInstagramLine)({
    minWidth: 40,
    height: 40,
});
const TwitterIconStyle = styled(RiTwitterFill)({
    minWidth: 40,
    height: 40,
});
const GoogleIconStyle = styled(RiGoogleFill)({
    minWidth: 40,
    height: 40,
});
const AlternativeText = styled(Typography)({
    fontFamily: 'Poppins',
    marginTop: 20,
    fontSize: '13px',
    fontWeight: 650,
});
const defaultValues = {
    email: '',
    password: '',
};
const LinkStyle = styled(link)({
    cursor: 'pointer',
    color: 'rgb(0, 131, 252)',
    textDecoration: 'none',
});
//gets the window dimensions in realtime
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}
const Login = () => {
    const navigate = useNavigate();
    //hook for the windows dimensions
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    // listens to window resize event and sets the state for windowdimensions
    useEffect(() => {
        //listens to the window dimensions change event and assign it to the hook windowDimensions
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //login credentials
    const [formValues, setFormValues] = useState(defaultValues);

    //password toggle hook
    const [showPassword, setShowPassword] = useState(false);
    //sets showPassword to true and false
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    //adds new objects to the hook formValues
    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    return (
        <Container>
            {windowDimensions.width < 1482 ? (
                <Fragment></Fragment>
            ) : (
                <Fragment>
                    <BallStyle1 />
                    <BallStyle2 />
                    <BallStyle3 />
                    <SideArrow />
                    <UpArrow />
                </Fragment>
            )}
            <CardStyle>
                <CompanyLogo>
                    <Text>Regenquest Logo</Text>
                </CompanyLogo>

                <LoginContainer>
                    <Text>Sign in with your Project: Human City account.</Text>
                    <TextField
                        fullWidth
                        id='email'
                        name='email'
                        label='Email'
                        onChange={handleInputChange}
                    />
                    <FormControl fullWidth variant='outlined'>
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput
                            name='password'
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handleClickShowPassword}
                                        edge='end'
                                    >
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label='Password'
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <ButtonContainer>
                        <ButtonStyle
                            className='bhEffect'
                            variant='contained'
                            disableElevation
                            onClick={() => {
                                console.log(formValues);
                                navigate('/VerifyUserLogin');
                            }}
                        >
                            Sign in
                        </ButtonStyle>
                    </ButtonContainer>
                    <BoxContainer>
                        <DividerStyle
                            sx={{
                                '&::before, &::after': {
                                    borderColor: 'black',
                                },
                            }}
                        >
                            <Text2>or sign in with your social media</Text2>
                        </DividerStyle>
                    </BoxContainer>
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
                            <GoogleIconStyle />
                        </IconContainer>
                    </SocialIconContainer>
                    <AlternativeText>
                        No account?
                        <LinkStyle
                            onClick={() => {
                                console.log(formValues);
                                navigate('/Register');
                            }}
                        >
                            {' '}
                            Sign up.
                        </LinkStyle>
                    </AlternativeText>
                </LoginContainer>
            </CardStyle>
        </Container>
    );
};

export default Login;
