import {
  Card,
  CardHeader,
  IconButton,
  LinearProgress,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import Link from "@mui/material/Link";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { AiOutlineInstagram } from "react-icons/ai";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import ReorderIcon from "@mui/icons-material/Reorder";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import "./style.css";
//icons
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GroupsIcon from "@mui/icons-material/Groups";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarComponent from "../../../components/Calendar/CalendarComponent";
import RadarGraph from "../../../components/RadarGraph/RadarGraph";
let currentLevel = 0;
let diffToNextLevel = 0;
const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";
//styles for this page
//this page is incomplete
const ProgressContainer = styled.div({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});
const BallStyleProfile = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "",
  borderRadius: 90,
  width: 135,
  height: 135,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});
const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});
//image will be assigned to backgrounImage
const BackgroundImgContainer = styled.div({
  display: "flex",
  position: "relative",

  top: "-8px",
  marginTop: 65,
  height: 208,
  width: "100%",

  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${randomImage})`,
});
const Text1 = styled(Typography)({
  position: "relative",
  fontSize: "23px",
  lineHeight: "18px",
  fontWeight: 600,
  color: "#000000",
  marginTop: 225,
  marginLeft: 10,
});
const SocialDiv = styled.div({
  marginTop: -5,
});

const BodyContainer = styled.div({
  display: "flex",
  height: "100%",
  width: "77%",
  flexDirection: "column",
  textAlign: "right",
});

const ParentCardContainer = styled.div({
  display: "flex",
  height: 900,
  width: "100%",
  flexDirection: "row",
  textAlign: "center",
  marginBottom: 600,
});
const CardContainer = styled.div({
  display: "flex",
  flexWrap: "wrap",
  flexdirection: "column",
  justifyContent: "center",
  width: "50%",
  marginTop: 30,
  gap: 20,
});
const StyledFacebook = styled(FaFacebookF)({
  minWidth: 30,
  height: 30,
  marginTop: 2,
  marginLeft: 5,
  color: "rgb(24, 119, 242)",
});
const StyledTwitter = styled(FaTwitter)({
  minWidth: 30,
  height: 30,
  marginTop: 2,
  marginLeft: 10,
  color: "rgb(28, 183, 235)",
});
const StyledInstagram = styled(AiOutlineInstagram)({
  minWidth: 30,
  height: 30,
  marginTop: 2,
  marginLeft: 5,
});

const CardStyle = styled(Card)({
  width: "90%",
  borderColor: "divider",
  height: "fit-content",
});
const InnerCard = styled(Card)({
  display: "flex",
  justifyContent: "center",
  width: 350,
  height: 400,
  zIndex: -100,
});
const SeeAllLink = styled(Typography)({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "18px",
  color: "#000000",
  marginTop: -25,
  textAlign: "right",
});
const ButtonSave = styled(Button)({
  backgroundColor: "rgb(217, 217, 217)",
  color: "black",
  fontWeight: 550,
  textTransform: "none",
  fontSize: 16,
  borderRadius: 30,
  height: 40,
  padding: 20,
  textAlign: "center",
  float: "right",
  marginTop: 30,
});
const ButtonSend = styled(Button)({
  backgroundColor: "rgb(217, 217, 217)",
  color: "black",
  fontWeight: 550,
  textTransform: "none",
  fontSize: 16,
  borderRadius: 30,
  height: 40,
  padding: 20,
  textAlign: "center",
  float: "right",
  marginTop: 30,
});
const ButtonFollow = styled(Button)({
  backgroundColor: "rgb(217, 217, 217)",
  color: "black",
  fontWeight: 500,
  textTransform: "none",
  fontSize: 16,
  borderRadius: 30,
  height: 40,
  padding: 20,
});
const ButtonMessage = styled(Button)({
  backgroundColor: "rgb(255, 255, 255)",
  color: "black",
  fontWeight: 500,
  textTransform: "none",
  fontSize: 16,
  borderRadius: 30,
  height: 40,
  padding: 20,
  border: "1px solid black",
  marginLeft: 5,
});
const ProfileContainer = styled.div({
  display: "flex",
});
const UserProfileExternalView = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl == null) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };
  const [openEditProfile, setopenEditProfile] = useState(false);
  const [openMeetingInvitation, setMeetingInvitation] = useState(false);
  const [openMessageOverlay, setopenMessageOverlay] = useState(false);
  const [openmessageSent, setopenMessageSent] = useState(false);
  //   const [value, setValue] = useState(new Date());

  const handleClickOpenEditProfile = () => {
    if (openEditProfile == false) {
      setopenEditProfile(true);
    } else {
      setopenEditProfile(false);
    }
  };
  const handleClickOpenMessageOverlay = () => {
    if (openMeetingInvitation == false) {
      setopenMessageOverlay(true);
    } else {
      setopenMessageOverlay(false);
    }
  };
  const handleCloseMessageOverlay = () => {
    setopenMessageOverlay(false);
  };
  const handleCloseMessageSent = () => {
    setopenMessageSent(false);
  };
  const handleMessageSent = () => {
    if (openmessageSent == false) {
      handleCloseMessageOverlay();
      setopenMessageSent(true);
    } else {
      setopenMessageSent(false);
    }
  };
  const FieldContainer = styled.div({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 18,
  });
  const TField = styled(TextField)({
    marginBottom: 15,
    width: 500,
  });
  let qr_api_url =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
  const link = "google.com";
  const [isSent, setisSent] = useState(false);
  const checkMessage = () => {
    //code for checking if message has been sent
    if (true) {
      setisSent(true);
    }
  };
  const MessageOverlay = () => (
    <>
      <Dialog
        open={openMessageOverlay}
        onClose={handleCloseMessageOverlay}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogTitle id="alert-dialog-message-overlay">
            <Typography style={{ fontWeight: 700, marginBottom: -10 }}>
              Send a message to @username!
            </Typography>{" "}
            <br />
            <Typography style={{ fontWeight: 600 }}>
              {" "}
              Participant information
            </Typography>
          </DialogTitle>
          <DialogContentText
            id="alert-dialog-description-message-overlay"
            style={{ paddingLeft: 25, paddingRight: 25 }}
          >
            <FieldContainer>
              <TField id="FullName" name="fullname" label="Full Name" />
              <TField
                id="PhoneNumber"
                name="phonenumber"
                label="Phone number"
              />
              <TField
                id="EmailAddress"
                name="emailaddress"
                label="Email Address"
              />
              <TField id="Topic" name="topic" label="Topic" />
              <TField id="Text" name="text" label="Text" />
            </FieldContainer>
            <ButtonSend
              sx={{
                ":hover": {
                  bgcolor: "rgb(233, 233, 233)",
                  color: "black",
                },
              }}
              onClick={handleMessageSent}
            >
              Send
            </ButtonSend>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
  const MessageSent = () => (
    <>
      <Dialog
        open={openmessageSent}
        onClose={handleCloseMessageSent}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogTitle id="alert-dialog-message-sent">
            <Typography style={{ textAlign: "center", fontWeight: 600 }}>
              Your message was successfully <br /> sent to @username!
            </Typography>{" "}
            <br />
            <div style={{ display: "inline-flex" }}>
              <NotificationsIcon
                style={{
                  fontSize: "26",
                  marginRight: "10",
                  color: "rgb(102,102,102)",
                }}
              />
              <Typography
                style={{ textAlign: "left", fontSize: "15", fontWeight: 400 }}
              >
                Check your notification center for more details
              </Typography>
            </div>
          </DialogTitle>
        </DialogContent>
      </Dialog>
    </>
  );

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseEdit = () => {
    setopenEditProfile(false);
  };
  const EditProfile = () => (
    <>
      <Dialog
        open={openEditProfile}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogTitle id="alert-dialog-title-edit">Edit Profile</DialogTitle>
          <DialogContentText
            id="alert-dialog-description-edit"
            style={{ paddingLeft: 25, paddingRight: 25 }}
          >
            <FieldContainer>
              <TextField
                sx={{
                  width: 500,
                }}
                InputProps={{ sx: { height: 101 } }}
                id="Bio"
                name="bio"
                label="Write your bio"
              />
              <TextField
                sx={{
                  width: 500,
                  marginTop: 3,
                  marginRight: 2,
                }}
                id="Location"
                name="location"
                label="Location"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MdLocationPin style={{ height: 25, width: 25 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </FieldContainer>
            <ButtonSave
              sx={{
                ":hover": {
                  bgcolor: "rgb(233, 233, 233)",
                  color: "black",
                },
              }}
            >
              Save
            </ButtonSave>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
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
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0.8,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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

  return (
    <Container>
      <MessageSent />
      <MessageOverlay />

      <EditProfile />
      <BackgroundImgContainer>
        <BallStyleProfile
          style={{
            backgroundImage: `url(${randomImage})`,
            marginTop: 120,
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
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              flexDirection: "row-reverse",
            }}
          >
            <IconButton onClick={handleClick}>
              <UserDropDown />
            </IconButton>
            <ButtonMessage
              sx={{
                ":hover": {
                  bgcolor: "rgb(255, 255, 255)",
                },
              }}
              disableRipple
              onClick={handleClickOpenMessageOverlay}
            >
              Message
            </ButtonMessage>
            <ButtonFollow
              sx={{
                ":hover": {
                  bgcolor: "rgb(233, 233, 233)",
                  color: "black",
                },
              }}
            >
              Follow
            </ButtonFollow>
          </div>
        </SocialDiv>
        <ParentCardContainer>

          <CardContainer>
            <CardStyle>
              <CardHeader
                title="Skills"
                style={{ textAlign: "left" }}
              ></CardHeader>
              <RadarGraph />
            </CardStyle>

            <CardStyle>
              <CardHeader
                title="Progress"
                style={{ textAlign: "left" }}
                subheader={
                  <SeeAllLink>
                    <Link href="#" color="#000000">
                      See Points history
                    </Link>
                  </SeeAllLink>
                }
              ></CardHeader>
              <ProgressContainer>
                <Typography style={{ marginRight: 230 }}>
                  level {currentLevel}
                </Typography>
                <Typography>
                  {diffToNextLevel} points to the next level
                </Typography>
              </ProgressContainer>
              <LinearProgress
                style={{
                  marginBottom: "10px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  height: "10px",
                  borderRadius: "10px",
                }}
                color="success"
                variant="determinate"
                value={currentLevel}
              />
            </CardStyle>

            <SimpleCard
              cardProperty={{
                label: "Recommendations",
                tabProps: {
                  tabLabels: ["Given", "Received"],
                  tabContexts: [
                    {
                      taskName: "",
                      type: "Given",
                      communityName: "",
                      location: "",
                      description: "",
                      projectName: "",
                      projectDescription: "",
                      userName: "Username",
                      recommendationText: "Recommendation text",
                    },
                  ],
                },
              }}
            />
          </CardContainer>
          <CardContainer>
            <SimpleCard
              cardProperty={{
                label: "Tasks",
                tabProps: {
                  tabLabels: ["Ongoing", "Completed"],
                  tabContexts: [
                    {
                      taskName: "Task name",
                      type: "Ongoing",
                      communityName: "Community name",
                      location: "location",
                      description: "description",
                      projectName: "",
                      projectDescription: "",
                      userName: "",
                      recommendationText: "",
                    },
                    {
                      taskName: "Task name",
                      type: "Ongoing",
                      communityName: "Community name",
                      location: "location",
                      description: "description",
                      projectName: "",
                      projectDescription: "",
                      userName: "",
                      recommendationText: "",
                    },
                    {
                      taskName: "Task name",
                      type: "Ongoing",
                      communityName: "Community name",
                      location: "location",
                      description: "description",
                      projectName: "",
                      projectDescription: "",
                      userName: "",
                      recommendationText: "",
                    },
                    {
                      taskName: "Task name",
                      type: "Ongoing",
                      communityName: "Community name",
                      location: "location",
                      description: "description",
                      projectName: "",
                      projectDescription: "",
                      userName: "",
                      recommendationText: "",
                    },
                    {
                      taskName: "Task name",
                      type: "Ongoing",
                      communityName: "Community name",
                      location: "location",
                      description: "description",
                      projectName: "",
                      projectDescription: "",
                      userName: "",
                      recommendationText: "",
                    },
                  ],
                },
              }}
            />
            <SimpleCard
              cardProperty={{
                label: "Your Groups",
                tabProps: {
                  tabLabels: ["Projects", "Programs", "Co-ops"],
                  tabContexts: [
                    {
                      taskName: "",
                      type: "Project",
                      communityName: "",
                      location: "",
                      description: "",
                      projectName: "Project name",
                      projectDescription: "Description",
                      userName: "",
                      recommendationText: "",
                    },
                    {
                      taskName: "",
                      type: "Project",
                      communityName: "",
                      location: "",
                      description: "",
                      projectName: "Project name",
                      projectDescription: "Description",
                      userName: "",
                      recommendationText: "",
                    },
                    {
                      taskName: "",
                      type: "Project",
                      communityName: "",
                      location: "",
                      description: "",
                      projectName: "Project name",
                      projectDescription: "Description",
                      userName: "",
                      recommendationText: "",
                    },
                  ],
                },
              }}
            />
            <CalendarComponent />
          </CardContainer>
        </ParentCardContainer>
      </BodyContainer>
    </Container>
  );
};

export default UserProfileExternalView;
