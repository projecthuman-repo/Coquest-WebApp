import { Button, Card, Typography } from '@mui/material';
import styled from '@emotion/styled';
import link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../../components/ProgressBar/index';
import { RiFacebookCircleFill, RiInstagramLine } from 'react-icons/ri';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
//styles for this page
const BallStyleGoogle = styled(FcGoogle)({
    minWidth: 33,
    height: 33,
    marginTop: 2,
    marginRight: 13,
    padding: 3,
    borderRadius: 20,
    backgroundColor: 'rgb(222, 222, 222)',
});
const BallStyleFacebook = styled(RiFacebookCircleFill)({
    minWidth: 40,
    height: 40,
    marginTop: 2,
    marginRight: 13,
    borderRadius: 20,
    color: 'rgb(24, 119, 242)',
});
const BallStyleTwitter = styled(AiFillTwitterCircle)({
    minWidth: 40,
    height: 40,
    marginTop: 2,
    borderRadius: 20,
    marginRight: 13,
    color: 'rgb(28, 183, 235)',
});
const BallStyleInstagram = styled(RiInstagramLine)({
    minWidth: 31,
    height: 31,
    marginTop: 2,
    marginRight: 13,
    padding: 3,
    borderRadius: 10,
    color: 'white',
    backgroundColor: 'rgb(179, 53, 135)',
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
const Header = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '25px',
    lineHeight: '18px',
    fontWeight: 600,
    color: '#000000',
    marginTop: 10,
    marginBottom: 30,
});
const Text = styled(Typography)({
    fontFamily: 'Poppins',
    fontSize: '20px',
    lineHeight: '18px',
    fontWeight: 400,
    color: '#000000',
    marginTop: 28,
    marginBottom: 30,
    textTransform: 'none',
});
const CardStyle = styled(Card)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 220,
    marginBottom: 10,
    borderRadius: 5,
});
const SocialIconContainer = styled(Button)({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    width: '100%',
});
const LinkStyle = styled(link)({
    cursor: 'pointer',
    color: 'black',
    marginLeft: 250,
    marginTop: 15,
    textDecorationColor: 'black',
});
const ConnectToSocialMedia = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <ProgressBar index={1} />
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
                        navigate('/LetGetYouStarted');
                    }}
                >
                    Next
                </ButtonNext>
            </ButtonsContainer>
            <Header>Connect to your social media.</Header>
            <CardStyle>
                <SocialIconContainer
                    sx={{
                        ':hover': {
                            bgcolor: 'rgb(233, 233, 233)',
                            color: 'black',
                        },
                    }}
                >
                    <BallStyleFacebook />
                    <Text>Facebook</Text>
                </SocialIconContainer>
            </CardStyle>
            <CardStyle>
                <SocialIconContainer
                    sx={{
                        ':hover': {
                            bgcolor: 'rgb(233, 233, 233)',
                            color: 'black',
                        },
                    }}
                >
                    <BallStyleTwitter />
                    <Text sx={{ marginRight: 4 }}>Twitter</Text>
                </SocialIconContainer>
            </CardStyle>
            <CardStyle>
                <SocialIconContainer
                    sx={{
                        ':hover': {
                            bgcolor: 'rgb(233, 233, 233)',
                            color: 'black',
                        },
                    }}
                >
                    <BallStyleInstagram />
                    <Text>Instagram</Text>
                </SocialIconContainer>
            </CardStyle>
            <CardStyle>
                <SocialIconContainer
                    sx={{
                        ':hover': {
                            bgcolor: 'rgb(233, 233, 233)',
                            color: 'black',
                        },
                    }}
                >
                    <BallStyleGoogle />
                    <Text sx={{ marginRight: 4 }}>Google</Text>
                </SocialIconContainer>
            </CardStyle>
            <LinkStyle
                onClick={() => {
                    navigate('/LetGetYouStarted');
                }}
            >
                Skip
            </LinkStyle>
        </Container>
    );
};

export default ConnectToSocialMedia;
