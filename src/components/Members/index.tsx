import React from "react";
import styled from "@emotion/styled";
import { colors, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import { borderRadius } from "@mui/system";


//creating props for user, link and role
export type MemberProps = {
  users: string[];
  showAllLink: string;
  userRole: string[];
};

const Header = styled(Typography)({
  fontWeight: 600,
  fontSize: 16,
  color: "#000000",
  lineHeight: "24px",
});

const ProfileIcon = styled(AccountCircleIcon)({
  color: "#000000",
});

const MembersContainer = styled.div({
  width: "381px",
  height: "329px",
  borderRadius: "10px",
  backgroundColor: "#D9D9D9",
});

const ShowAllLink = styled(Typography)({
  fontWeight: 400,
  fontSize: "7px",
  lineHeight: "10.5px",
  color: "#000000",
});

const handleClick = () => {
  console.info("You clicked the button.");
};

//maps through data to display user info in the members container

const Members = ({ users, showAllLink, userRole }: MemberProps) => {
  return (
    <div>
      <MembersContainer>
        <Header
          style={{
            position: "relative",
            top: "18px",
            left: "35px",
          }}
        >
          Members
        </Header>
        <div
          style={{
            position: "relative",
            left: "0px",
            top: "26px",
          }}
        >
          <List>
            {users.map((user, index) => {
              const userContent = userRole[index];
              return (
                <>
                  <ListItem
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <ListItemAvatar>
                      <ProfileIcon
                        style={{
                          position: "relative",
                          left: "30",
                          top: "7px",
                          fontSize: "30.5px",
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: "10.62px",
                        lineHeight: "15.94px",
                        color: "#000000",
                        position: "relative",
                        top: "5px",
                        left: "17px",
                      }}
                      primary={user}
                    />
                    <Chip
                      label={userContent}
                      onClick={handleClick}
                      style={{
                        backgroundColor: "#F0F0F0",
                        fontSize: "6.64px",
                        lineHeight: "9.96px",
                        fontWeight: 400,
                        borderRadius: "13.28px",
                        width: "43.43px",
                        height: "20.68px",
                        position: "relative",
                        top: "5px",
                        right: "105px",
                      }}
                    />
                  </ListItem>
                  {index !== 3 ? (
                    <Divider
                      sx={{
                        borderBottomWidth: "1.5px",
                      }}
                      variant="middle"
                      component="li"
                      color="#B8B8B8"
                      style={{
                        width: "251px",
                        position: "relative",
                        left: "13px",
                        bottom: "2px",
                      }}
                    />
                  ) : null}
                </>
              );
            })}
          </List>
        </div>
      </MembersContainer>
      <ShowAllLink
        style={{
          position: "relative",
          bottom: "294px",
          left: "315px",
        }}
      >
        <Link href={showAllLink} color="#000000">
          show all
        </Link>
      </ShowAllLink>
    </div>
  );
};

export default Members;
