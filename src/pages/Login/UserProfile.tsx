
import {
    Card,
    CardHeader,
    IconButton,
    LinearProgress,
    Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import { useState } from 'react';
import Link from '@mui/material/Link';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { AiOutlineInstagram } from 'react-icons/ai';
import SimpleCard from '../../components/SimpleCard/SimpleCard';
import RadarGraph from '../../components/RadarGraph/RadarGraph';

let currentLevel = 0;
let diffToNextLevel = 0;
const randomImage =
    'https://source.unsplash.com/1600x900/?nature,photography,technology';
//styles for this page
//this page is incomplete

const ProgressContainer = styled.div({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

})
const BallStyleProfile = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '',
    borderRadius: 90,
    width: 135,
    height: 135,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    marginTop: 120,
    marginLeft: 90,
});
const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
});
//image will be assigned to backgrounImage
const BackgroundImgContainer = styled.div({
    display: 'flex',
    position: 'relative',

    top: '-8px',
    marginTop: 65,
    height: 208,
    width: '100%',

    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${randomImage})`,
});
const Text1 = styled(Typography)({
    position: 'relative',
    fontSize: '23px',
    lineHeight: '18px',
    fontWeight: 600,
    color: '#000000',
    marginTop: 225,
    marginLeft: 10,
});
const SocialDiv = styled.div({
    marginTop: -5,
});

const BodyContainer = styled.div({
    display: 'flex',
    height: '100%',
    width: '77%',
    flexDirection: 'column',
    textAlign: 'right',
});

const ParentCardContainer = styled.div({
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    textAlign: 'center',
    marginBottom: 200,
});
const CardContainer = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    flexdirection: 'column',
    justifyContent: 'center',
    width: '50%',
    marginTop: 30,
    gap: 20,
});
const StyledFacebook = styled(FaFacebookF)({
    minWidth: 30,
    height: 30,
    marginTop: 2,
    marginLeft: 5,
    color: 'rgb(24, 119, 242)',
});
const StyledTwitter = styled(FaTwitter)({
    minWidth: 30,
    height: 30,
    marginTop: 2,
    marginLeft: 10,
    color: 'rgb(28, 183, 235)',
});
const StyledInstagram = styled(AiOutlineInstagram)({
    minWidth: 30,
    height: 30,
    marginTop: 2,
    marginLeft: 5,
});

const CardStyle = styled(Card)({
    width: '90%',
    borderColor: 'divider',
    height: 'fit-content',

})
const SeeAllLink = styled(Typography)({
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    color: "#000000",
    marginTop: -25,
    textAlign: 'right'
})

const LabelContainer = styled.div({
    width: "80px",
    height: "24px",
    bottom: "1193px",
    left: "0px",
    position: "relative",
});
const SkillsContainer = styled.div({
    marginTop: 20,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    height: 100,
    width: 350,
    gap: 5,
});

const UserProfile = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    const [progress, setProgress] = useState(0);
    return (
        <Container>
            <BackgroundImgContainer
            >

                <BallStyleProfile
                    style={{
                        backgroundImage: `url(${randomImage})`,
                    }}
                />
                <Text1>UserName</Text1>

            </BackgroundImgContainer>
            <BodyContainer>
                <SocialDiv>
                    <IconButton>
                        <StyledInstagram />
                    </IconButton>
                    <IconButton>
                        <StyledFacebook />
                    </IconButton>
                    <IconButton>
                        <StyledTwitter />
                    </IconButton>

                </SocialDiv>
                <ParentCardContainer>
                    <CardContainer>
                        <CardStyle>
                            <CardHeader
                                title='Skills'
                                style={{ textAlign: 'left' }}
                            >
                            </CardHeader>
                            <RadarGraph />
                        </CardStyle>
                        <CardStyle>
                            <CardHeader
                                title='Progress'
                                style={{ textAlign: 'left' }}
                                subheader={
                                    <SeeAllLink
                                    >
                                        <Link href="#" color="#000000">
                                            See Points history
                                        </Link>
                                    </SeeAllLink>}
                            >
                            </CardHeader>
                            <ProgressContainer>
                                <Typography
                                    style={{ marginRight: 230 }}
                                >level {currentLevel}</Typography>
                                <Typography>{diffToNextLevel} points to the next level</Typography>
                            </ProgressContainer>
                            <LinearProgress style={{ marginBottom: '10px', marginLeft: '15px', marginRight: '15px', height: '10px', borderRadius: '10px' }} color='success' variant="determinate" value={currentLevel} />
                        </CardStyle>

                        <SimpleCard cardProperty={{
                            label: 'Recommendations',
                            tabProps: {
                                tabLabels: ['Given', 'Received'],
                                tabContexts: [{
                                    taskName: '',
                                    type: 'Given',
                                    communityName: '',
                                    location: '',
                                    description: '',
                                    projectName: '',
                                    projectDescription: '',
                                    userName: 'Username',
                                    recommendationText: 'Recommendation text',

                                }]
                            }
                        }}
                        />
                    </CardContainer>
                    <CardContainer>

                        <SimpleCard cardProperty={{
                            label: 'Tasks',
                            tabProps: {
                                tabLabels: ['Ongoing', 'Completed'],
                                tabContexts: [{
                                    taskName: 'Task name',
                                    type: 'Ongoing',
                                    communityName: 'Community name',
                                    location: 'location',
                                    description: 'description',
                                    projectName: '',
                                    projectDescription: '',
                                    userName: '',
                                    recommendationText: '',

                                }, {
                                    taskName: 'Task name',
                                    type: 'Ongoing',
                                    communityName: 'Community name',
                                    location: 'location',
                                    description: 'description',
                                    projectName: '',
                                    projectDescription: '',
                                    userName: '',
                                    recommendationText: '',

                                }, {
                                    taskName: 'Task name',
                                    type: 'Ongoing',
                                    communityName: 'Community name',
                                    location: 'location',
                                    description: 'description',
                                    projectName: '',
                                    projectDescription: '',
                                    userName: '',
                                    recommendationText: '',

                                }, {
                                    taskName: 'Task name',
                                    type: 'Ongoing',
                                    communityName: 'Community name',
                                    location: 'location',
                                    description: 'description',
                                    projectName: '',
                                    projectDescription: '',
                                    userName: '',
                                    recommendationText: '',

                                }, {
                                    taskName: 'Task name',
                                    type: 'Ongoing',
                                    communityName: 'Community name',
                                    location: 'location',
                                    description: 'description',
                                    projectName: '',
                                    projectDescription: '',
                                    userName: '',
                                    recommendationText: '',

                                }]
                            }
                        }} />
                        <SimpleCard cardProperty={{
                            label: 'Your Groups',
                            tabProps: {
                                tabLabels: ['Projects', 'Programs', 'Co-ops'],
                                tabContexts: [{
                                    taskName: '',
                                    type: 'Project',
                                    communityName: '',
                                    location: '',
                                    description: '',
                                    projectName: 'Project name',
                                    projectDescription: 'Description',
                                    userName: '',
                                    recommendationText: '',

                                }, {
                                    taskName: '',
                                    type: 'Project',
                                    communityName: '',
                                    location: '',
                                    description: '',
                                    projectName: 'Project name',
                                    projectDescription: 'Description',
                                    userName: '',
                                    recommendationText: '',

                                }, {
                                    taskName: '',
                                    type: 'Project',
                                    communityName: '',
                                    location: '',
                                    description: '',
                                    projectName: 'Project name',
                                    projectDescription: 'Description',
                                    userName: '',
                                    recommendationText: '',

                                }]
                            }
                        }} />
                    </CardContainer>
                </ParentCardContainer>

            </BodyContainer >
        </Container >
    );
};

export default UserProfile;
