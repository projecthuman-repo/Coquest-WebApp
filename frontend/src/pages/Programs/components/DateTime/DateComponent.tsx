import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "@emotion/styled";
import { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-US";
import { TextField, Popover } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { format } from "date-fns";

registerLocale("en", en);

const CalendarIcon = styled(EventIcon)({
  marginRight: 8,
  color: "rgba(0, 0, 0, 0.38)",
});

const ArrowDownIcon = styled(KeyboardArrowDownIcon)({
  color: "rgba(0, 0, 0, 0.38)",
});

const StyledTextField = styled(TextField)`
  && {
    margin-top: 22px;
    .MuiInputLabel-shrink {
      color: black;
    }
    .MuiInputAdornment-root {
      margin-right: 12px;
    }
    .MuiOutlinedInput-root {
      &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: rgba(0, 0, 0, 0.23);
        border-width: 1px;
      }
    }
  }
`;

type DateComponentProps = {
  label: string | React.ReactNode;
  value: Date | null;
  onChange: (date: Date | null) => void;
  maxDate?: Date;
  minDate?: Date;
};

const DateComponent: React.FC<DateComponentProps> = ({ label, value, onChange, maxDate, minDate }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (date: Date | null) => {
    onChange(date);
    handleClose();
  };

  const formatDate = (date: Date | null): string => {
    return date ? format(date, "MMM dd, yyyy") : "";
  };

  return (
    <>
      <StyledTextField
        label={label}
        fullWidth
        value={formatDate(value)}
        onClick={handleClick}
        InputProps={{
          startAdornment: <CalendarIcon />,
          endAdornment: <ArrowDownIcon />,
          readOnly: true,
        }}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <DatePicker
          selected={value}
          onChange={handleDateChange}
          maxDate={maxDate}
          minDate={minDate}
          inline
        />
      </Popover>
    </>
  );
};

export default DateComponent;