import React from "react";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

//takes props for users name and community name 
type WelcomeMessageProps = {
  name: string;
  communityName: string;
};

const Name = styled(Typography)({
  fontWeight: 400,
  fontSize: "20px",
  color: "#000000",
  lineHeight: "30px",
});

const CommunityName = styled(Typography)({
  fontWeight: 500,
  fontSize: "20px",
  color: "#000000",
  lineHeight: "30px",
});

const Header = styled(Typography)({
  fontWeight: 600,
  fontSize: "36px",
  color: "#000000",
  lineHeight: "54px",
});

const NameContainer = styled.div({
  width: "319px",
  height: "27px",
  left: "135px",
  top: "45px",
  padding: "0px",
  position: "relative",
});

const CommunityContainer = styled.div({
  width: "334px",
  height: "91px",
  left: "135px",
  top: "65px",
  padding: "0px",
  position: "relative",
});

//displays message on screen 
const WelcomeMessage = ({ name, communityName }: WelcomeMessageProps) => {
  return (
    <div>
      <NameContainer>
        <Name>Welcome, {name}</Name>
      </NameContainer>
      <CommunityContainer>
        {
          <Header
            style={{
              position: "relative",
              top: "-5px",
            }}
          >
            Overview.
          </Header>
        }

        {<CommunityName>{communityName}</CommunityName>}
      </CommunityContainer>
    </div>
  );
};

export default WelcomeMessage;
