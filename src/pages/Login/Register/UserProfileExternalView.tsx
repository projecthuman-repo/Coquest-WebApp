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
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { Popper } from "@mui/material";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import styled from "@emotion/styled";
import { SetStateAction, useState } from "react";
import Link from "@mui/material/Link";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import ReorderIcon from "@mui/icons-material/Reorder";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { CChart } from "@coreui/react-chartjs";
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
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MdLocationPin } from "react-icons/md";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
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

//Calendar component: Checks if the slot is availiable logic
dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  isSlotAvailable: boolean;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isSlotAvailable",
})<CustomPickerDayProps>(({ isSlotAvailable, day }) => ({
  ...(day.isAfter(dayjs(), "day") && !isSlotAvailable
    ? {
      backgroundColor: "lightBlue",
    }
    : {}),
  "&:hover": {
    // backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
  },
})) as React.ComponentType<CustomPickerDayProps>;

// Calendar component ended
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingPlace((event.target as HTMLInputElement).value);
  };

  const [meetingPlace, setMeetingPlace] = useState("In Person");
  const [openDrop, setopenDrop] = useState(false);
  const [openEditProfile, setopenEditProfile] = useState(false);
  const [openMeetingInvitation, setMeetingInvitation] = useState(false);
  const [openMessageOverlay, setopenMessageOverlay] = useState(false);
  const [openmessageSent, setopenMessageSent] = useState(false);
  //   const [value, setValue] = useState(new Date());
  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const handleCloseQRcode = () => {
    setopenDrop(false);
  };

  const handleClickOpenEditProfile = () => {
    if (openEditProfile == false) {
      setopenEditProfile(true);
    } else {
      setopenEditProfile(false);
    }
  };
  const handleClickOpenMeetingInvitation = () => {
    if (openMeetingInvitation == false) {
      setMeetingInvitation(true);
    } else {
      setMeetingInvitation(false);
    }
  };
  const handleClickOpenMessageOverlay = () => {
    if (openMeetingInvitation == false) {
      setopenMessageOverlay(true);
    } else {
      setopenMessageOverlay(false);
    }
  };
  const handleCloseMeetingInvitation = () => {
    setMeetingInvitation(false);
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
  const QrCode = () => (
    <>
      <Dialog
        open={openDrop}
        onClose={handleCloseQRcode}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <DialogContent
          style={{
            marginRight: "100",
            marginLeft: "100",
            marginTop: 100,
            marginBottom: 40,
          }}
        >
          <BallStyleProfile
            style={{
              position: "absolute",
              marginTop: -75,
              left: "31.9%",
              display: "block",
            }}
          />
          <InnerCard style={{}}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div>hello</div>
              <Typography>Username</Typography>
              <img
                style={{ width: 200, height: 200 }}
                src={qr_api_url + link}
              />
            </Box>
          </InnerCard>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
  const [isSent, setisSent] = useState(false);
  const checkMessage = () => {
    //code for checking if message has been sent
    if (true) {
      setisSent(true);
    }
  };

  // Calendar component logic
  type MeetingsData = {
    [date: string]: string[];
  };
  const initialMeetingsData: MeetingsData = {

  };
  const [meetings, setMeetings] = useState<MeetingsData>(initialMeetingsData);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(meetings);
    // Get the input value from the form
    const { dateandtime } = event.currentTarget.elements as any;
    // Update the state with the new date
    const [date, time] = dateandtime.value.toString().split("T");
    let tempMeetings = {} as MeetingsData;
    if (meetings) tempMeetings = { ...meetings };
    if (tempMeetings[date]) tempMeetings[date] = [...tempMeetings[date], time];
    else {
      tempMeetings[date] = [time];
    }
    setMeetings(tempMeetings);
    // Reset the form
    event.currentTarget.reset();
    handleCloseMeetingInvitation();
  };

  interface TimeSlotsProps {
    startingTimes: number[];
  }

  const TimeSlots: React.FC<TimeSlotsProps> = ({ startingTimes }) => {
    const availableSlots: { start: number; end: number }[] = [];
    const startTime = 9;
    const endTime = 17;

    if (startingTimes.length === 0) {
      availableSlots.push({ start: startTime, end: endTime });
    } else {
      let startHour = startTime;
      let endHour = startTime;

      for (let i = startTime; i <= endTime; i++) {
        if (startingTimes.includes(i) || i === endTime) {
          if (startHour !== endHour) {
            availableSlots.push({ start: startHour, end: endHour });
          }
          startHour = i + 1;
        }
        endHour = i + 1;
      }
    }

    return startingTimes.length >= 3 ? (
      <div>no slots available</div>
    ) : (
      <div>
        {availableSlots.map((slot) => (
          <div key={`${slot.start}-${slot.end}`}>
            {slot.start.toString().padStart(2, "0")}:00 -{" "}
            {slot.end.toString().padStart(2, "0")}:00
          </div>
        ))}
      </div>
    );
  };

  function Day(props: PickersDayProps<Dayjs> & { selectedDay?: Dayjs | null }) {
    const { day, selectedDay, ...other } = props;
    const formattedDate = dayjs(day).format("YYYY-MM-DD");
    const dt = formattedDate.toString();
    let isMeetingExists = Boolean(meetings[dt]) && meetings[dt].length >= 3;
    const [showTooltip, setShowTooltip] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
      setShowTooltip(true);
      setAnchorEl(event.currentTarget);
    };

    const handleMouseLeave = () => {
      setShowTooltip(false);
      setAnchorEl(null);
    };

    let startingTimes: number[] = [];
    if (Boolean(meetings[dt])) {
      startingTimes = meetings[dt].map((time) => {
        const hour = time.slice(0, 2);
        return parseInt(hour);
      });
      console.log(startingTimes);
    }

    const tooltipContent = (
      <div
        style={{
          backgroundColor: "white",
          color: "rgba(0, 0, 0, 0.87)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          fontSize: 12,
          padding: 8,
          fontWeight: "bold",
          width: "120px",
        }}
      >
        <div style={{ fontWeight: "bold" }}>Available times:</div>
        <TimeSlots startingTimes={startingTimes} />
      </div>
    );

    return (
      <>
        <CustomPickersDay
          {...other}
          day={day}
          z-index={1}
          isSlotAvailable={isMeetingExists}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <Popper
          open={showTooltip}
          anchorEl={anchorEl}
          placement="top"
          disablePortal
          style={{ zIndex: 1 }}
        >
          {({ TransitionProps }) => (
            <div
              {...TransitionProps}
              style={{
                transformOrigin: "center top",
                marginTop: "5px",
              }}
            >
              {tooltipContent}
            </div>
          )}
        </Popper>
      </>
    );
  }
  // end of calendar component logic
  const MeetingInvitation = () => (
    <>
      <Dialog
        open={openMeetingInvitation}
        onClose={handleCloseMeetingInvitation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogTitle id="alert-dialog-schedule-meeting">
            Schedule a meeting
          </DialogTitle>
          <DialogContentText
            id="alert-dialog-description-schedule-meeting"
            style={{ paddingLeft: 25, paddingRight: 25 }}
          >
            <form onSubmit={handleSubmit}>
              <FieldContainer>
                <TextField
                  sx={{
                    width: 500,
                  }}
                  id="Title"
                  name="title"
                  label="Add title"
                />
                <TextField
                  sx={{
                    width: 500,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon style={{ height: 25, width: 25 }} />
                      </InputAdornment>
                    ),
                  }}
                  id="DateandTime"
                  name="dateandtime"
                  label="Date and time"
                  type="datetime-local"
                />
                <FormControl>
                  <FormLabel id="location-of-meeting">
                    Where is this meeting taking place?
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="radio-buttons-group-label"
                    defaultValue="In person"
                    name="radio-buttons-group"
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="In person"
                      control={<Radio />}
                      label="In person"
                    />
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MdLocationPin style={{ height: 25, width: 25 }} />
                          </InputAdornment>
                        ),
                      }}
                      disabled={meetingPlace === "Remote"}
                      sx={{
                        width: 460,
                        marginLeft: 5,
                      }}
                      id="Meeting"
                      name="meeting"
                      label="Location"
                    />
                    <FormControlLabel
                      value="Remote"
                      control={<Radio />}
                      label="Remote"
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  sx={{
                    width: 500,
                    "& .MuiInputBase-root": {
                      height: 90,
                    },
                  }}
                  id="Description"
                  name="description"
                  label="Description"
                />
              </FieldContainer>
              <ButtonSend
                sx={{
                  ":hover": {
                    bgcolor: "rgb(233, 233, 233)",
                    color: "black",
                  },
                }}
                type="submit"
              >
                Send
              </ButtonSend>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
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
      <MeetingInvitation />
      <MessageOverlay />

      <EditProfile />
      <QrCode />
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
              // subheader={
              //     // <SkillsContainer>
              //     //     <ListOfSkills skills={['Communication', 'Organized', 'Driver', 'Program Manager', 'Gardening']} />

              //     // </SkillsContainer>
              // }
              ></CardHeader>
              <CChart
                style={{
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                type="radar"
                data={{
                  labels: [
                    "Rites",
                    "Numeracy",
                    "Literacy",
                    "Charioteering",
                    "Archery",
                    "Music",
                  ],
                  datasets: [
                    {
                      label: "Communication",
                      backgroundColor: "rgba(164, 206, 57, 255)",
                      borderColor: "rgba(164, 206, 57, 255)",
                      pointBackgroundColor: "rgba(164, 206, 57, 255)",
                      pointBorderColor: "#fff",
                      data: [65, 59, 90, 81, 56, 55],
                    },
                    {
                      label: "Organized",
                      backgroundColor: "rgba(164, 206, 57, 255)",
                      borderColor: "rgba(164, 206, 57, 255)",
                      pointBackgroundColor: "rgba(164, 206, 57, 255)",
                      pointBorderColor: "#fff",
                      hidden: true,
                      data: [28, 48, 40, 19, 96, 27],
                    },
                    {
                      label: "Driver",
                      backgroundColor: "rgba(164, 206, 57, 255)",
                      borderColor: "rgba(164, 206, 57, 255)",
                      pointBackgroundColor: "rgba(164, 206, 57, 255)",
                      pointBorderColor: "#fff",
                      hidden: true,

                      data: [40, 41, 42, 43, 44, 45],
                    },
                  ],
                }}
              />
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
            <CardStyle>
              <CardHeader
                title="Calendar"
                style={{ textAlign: "left" }}
                subheader={
                  <SeeAllLink>
                    <Link
                      style={{ cursor: "pointer" }}
                      onClick={handleClickOpenMeetingInvitation}
                      color="#000000"
                    >
                      Schedule a meeting
                    </Link>
                  </SeeAllLink>
                }
              ></CardHeader>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  disablePast
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  slots={{ day: Day }}
                  slotProps={{
                    day: {
                      selectedDay: value,
                    } as any,
                  }}
                />
              </LocalizationProvider>
            </CardStyle>
          </CardContainer>
        </ParentCardContainer>
      </BodyContainer>
    </Container>
  );
};

export default UserProfileExternalView;
