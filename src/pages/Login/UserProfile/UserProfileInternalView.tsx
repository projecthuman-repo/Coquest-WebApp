import {
    Card,
    CardHeader,
    IconButton,
    LinearProgress,
    Typography,
    TextField,
    InputAdornment,
    Button,
    Box,
} from '@mui/material';
import styled from '@emotion/styled';
import { useState } from 'react';
import Link from '@mui/material/Link';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { AiOutlineInstagram } from 'react-icons/ai';
import SimpleCard from '../../../components/SimpleCard/SimpleCard';
import ReorderIcon from '@mui/icons-material/Reorder';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';

//icons
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GroupsIcon from "@mui/icons-material/Groups";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MdLocationPin } from 'react-icons/md';
import RadarGraph from '../../../components/RadarGraph/RadarGraph';
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

    fontSize: '23px',
    lineHeight: '18px',
    fontWeight: 600,
    color: '#000000',
    marginTop: 225,
    marginLeft: 10,
});
const UserName = styled(Typography)({
    fontSize: '23px',
    lineHeight: '18px',
    fontWeight: 600,
    color: '#000000',
    marginTop: 10,
});
const Greeting = styled(Typography)({
    fontSize: '18px',
    lineHeight: '18px',
    fontWeight: 500,
    color: '#000000',
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
const InnerCard = styled(Card)({
    display: 'flex',
    justifyContent: 'center',
    width: 350,
    height: 400,
    zIndex: -100,
})
const SeeAllLink = styled(Typography)({
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    color: "#000000",
    marginTop: -25,
    textAlign: 'right'
})
const ButtonSave = styled(Button)({
    backgroundColor: 'rgb(217, 217, 217)',
    color: 'black',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: 16,
    borderRadius: 30,
    height: 40,
    padding: 20,
    textAlign: 'center',
    float: 'right',
    marginTop: 30,
});
const ProfileContainer = styled.div({
    display: 'flex',
});
export interface SimpleDialogProps {
    openDrop: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}
const UserProfileInternalView = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (anchorEl == null) {

            setAnchorEl(event.currentTarget);
        }
        else {
            setAnchorEl(null);
        }
    };
    const [openDrop, setopenDrop] = useState(false);
    const [openEditProfile, setopenEditProfile] = useState(false);

    const handleClickOpen = () => {
        if (openDrop == false) {

            setopenDrop(true);
        }
        else {
            setopenDrop(false);
        }
    };
    const handleCloseQRcode = () => {
        setopenDrop(false);
    }

    const handleClickOpenEditProfile = () => {
        console.log('onclick edit profile', openEditProfile)
        if (openEditProfile == false) {

            console.log('setting edit profile to true');
            setopenEditProfile(true);
        }
        else {
            setopenEditProfile(false);
        }
    };
    const FieldContainer = styled.div({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    });
    let qr_api_url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="
    const link = "google.com"
    const QrCode = (() =>
        <><Dialog
            open={openDrop}
            onClose={handleCloseQRcode}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            <DialogContent>
                <BallStyleProfile style={{ position: 'absolute', marginTop: -75, left: '31.9%', display: "block" }} />
                <InnerCard>
                    <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                        <Greeting>hello</Greeting>
                        <UserName>Username</UserName>
                        <img style={{ width: 200, height: 200, marginTop: 20 }} src={qr_api_url + link} />
                    </Box>

                </InnerCard>
                <DialogContentText id="alert-dialog-description">

                </DialogContentText>
            </DialogContent>

        </Dialog></>
    )

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseEdit = () => {
        setopenEditProfile(false);
    }
    const EditProfile = (() => <><Dialog
        open={openEditProfile}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogContent>
            <DialogTitle id="alert-dialog-title-edit">
                Edit Profile
            </DialogTitle>
            <DialogContentText id="alert-dialog-description-edit" style={{ paddingLeft: 25, paddingRight: 25 }}>
                <FieldContainer>
                    <TextField
                        sx={{
                            width: 500,
                        }}
                        InputProps={{ sx: { height: 101 } }}
                        id='Bio'
                        name='bio'
                        label='Write your bio'
                    />
                    <TextField
                        sx={{
                            width: 500,
                            marginTop: 3,
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
                </FieldContainer>
                <ButtonSave sx={{
                    ':hover': {
                        bgcolor: 'rgb(233, 233, 233)',
                        color: 'black',
                    },
                }}>Save</ButtonSave>
            </DialogContentText>
        </DialogContent>

    </Dialog></>
    )
    const UserDropDown = () => (
        <ProfileContainer>
            <ReorderIcon />
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 0.8,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClickOpenEditProfile}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />

                    </ListItemIcon>
                    Edit profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <BookmarkIcon fontSize="small" />
                    </ListItemIcon>
                    Saved
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <GroupsIcon fontSize="small" />
                    </ListItemIcon>
                    Connect social media
                </MenuItem>
            </Menu>
        </ProfileContainer>
    );
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setProgress((oldProgress) => {
    //             if (oldProgress === 100) {
    //                 return 0;
    //             }
    //             const diff = Math.random() * 10;
    //             return Math.min(oldProgress + diff, 100);
    //         });
    //     }, 500);
    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []);
    return (
        <Container>
            <EditProfile />
            <QrCode />
            <BackgroundImgContainer
            >

                <BallStyleProfile
                    style={{
                        backgroundImage: `url(${randomImage})`, marginTop: 120,
                        marginLeft: 90,

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
                    <IconButton onClick={handleClickOpen}>
                        <QrCodeIcon />
                    </IconButton>
                    <IconButton onClick={handleClick}>
                        <UserDropDown />
                    </IconButton>
                </SocialDiv>
                <ParentCardContainer>

                    <CardContainer>
                        <CardStyle
                        >
                            <CardHeader
                                title='Skills'
                                style={{ textAlign: 'left' }}
                            >
                            </CardHeader>
                            <RadarGraph />
                        </CardStyle>
                        <CardStyle
                        >
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
export default UserProfileInternalView;
