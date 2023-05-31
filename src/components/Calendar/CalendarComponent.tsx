import React from 'react'
import {
  Card,
  CardHeader,
  Typography,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Button,
  TextField,
  InputAdornment,

} from "@mui/material";
import Link from "@mui/material/Link";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { Popper } from "@mui/material";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MdLocationPin } from "react-icons/md";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { SetStateAction, useState } from "react";
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

const FieldContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 18,
});
//Calendar component: Checks if the slot is availiable logic
dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  isSlotAvailable: boolean;
}

const CardStyle = styled(Card)({
  width: "90%",
  borderColor: "divider",
  height: "fit-content",
});
const SeeAllLink = styled(Typography)({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "18px",
  color: "#000000",
  marginTop: -25,
  textAlign: "right",
});
// Calendar component ended
const CalendarComponent = () => {
  const handleClickOpenMeetingInvitation = () => {
    if (openMeetingInvitation == false) {
      setMeetingInvitation(true);
    } else {
      setMeetingInvitation(false);
    }
  };
  const handleCloseMeetingInvitation = () => {
    setMeetingInvitation(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingPlace((event.target as HTMLInputElement).value);
  };
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
  const [meetingPlace, setMeetingPlace] = useState("In Person");
  const [openMeetingInvitation, setMeetingInvitation] = useState(false);
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
  const [value, setValue] = useState<Dayjs | null>(dayjs());
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
  return (
    <><MeetingInvitation /><CardStyle>
      <CardHeader
        title="Calendar"
        style={{ textAlign: "left" }}
        subheader={<SeeAllLink>
          <Link
            style={{ cursor: "pointer" }}
            onClick={handleClickOpenMeetingInvitation}
            color="#000000"
          >
            Schedule a meeting
          </Link>
        </SeeAllLink>}
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
          }} />
      </LocalizationProvider>
    </CardStyle></>
  );

}

export default CalendarComponent;