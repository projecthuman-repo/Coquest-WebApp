import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";


//props that takes the header for post container 
type PostContainerProps = {
  header: string;
};

const Header = styled(Typography)({
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#000000",
});

export const ImageBoxes = styled.div({
  width: "87.68px",
  height: "87.68px",
  borderRadius: "4px",
  backgroundColor: "#666666",
});

const ChevronIcon = styled(ChevronRightIcon)({
  color: "#666666",
});

const OuterContainer = styled.div({
  width: "319px",
  height: "421px",
  backgroundColor: "#F3F3F3",
  borderRadius: "10px",
});

//post container holds the header, posts, and button 
//maps through post data to display in a 9x9 grid format 
const PostContainer = ({ header }: PostContainerProps) => {
  return (
    <OuterContainer>
      <div
        style={{
          position: "relative",
          top: "19px",
          left: "24px",
        }}
      >
        <Header>{header}</Header>
      </div>
      <IconButton
        style={{
          position: "relative",
          bottom: "13px",
          left: "275px",
        }}
      >
        <ChevronIcon />
      </IconButton>

      <Stack
        spacing={0.5}
        style={{
          position: "relative",
          left: "25px",
          bottom: "0px",
        }}
      >
        <ImageBoxes />
        <ImageBoxes />
        <ImageBoxes />
      </Stack>

      <Stack
        spacing={0.5}
        style={{
          position: "relative",
          left: "117px",
          bottom: "271px",
        }}
      >
        <ImageBoxes />
        <ImageBoxes />
        <ImageBoxes />
      </Stack>

      <Stack
        spacing={0.5}
        style={{
          position: "relative",
          left: "209px",
          bottom: "542px",
        }}
      >
        <ImageBoxes />
        <ImageBoxes />
        <ImageBoxes />
      </Stack>
    </OuterContainer>
  );
};

export default PostContainer;
