import React from 'react';
import styled from '@emotion/styled';
import { User } from '../../models/usermodel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SimpleCard from '../../components/SimpleCard/SimpleCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Username = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Icon = styled.a`
  color: #000;
  font-size: 24px;
  &:hover {
    color: #007bff;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 0 5px;
  border-radius: 20px;
  border: 1px solid black;
  cursor: pointer;
`;

const FollowButton = styled(Button)`
  background-color: lightgrey;
  color: black;
`;

const MessageButton = styled(Button)`
  background-color: white;
  color: black;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 70%;
  margin-top: 40px;
`;

const FullWidthCard = styled(SimpleCard)`
  grid-column: span 3;
`;

const TwoColumnCard = styled(SimpleCard)`
  grid-column: span 2;
`;

const OneColumnCard = styled(SimpleCard)`
  grid-column: span 1;
`;

interface UserProfileExternalProps {
    user: User;
}

const UserProfileExternal: React.FC<UserProfileExternalProps> = ({ user }) => {
    return (
        <Container>
            <Avatar src={user.images?.[0]?.path || '/default-avatar.png'} alt="User Avatar" />
            <Username>{user.name}</Username>
            <SocialMediaIcons>
                <Icon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FacebookIcon />
                </Icon>
                <Icon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <TwitterIcon />
                </Icon>
                <Icon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon />
                </Icon>
                <Icon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon />
                </Icon>
            </SocialMediaIcons>
            <FollowButton>Follow</FollowButton>
            <MessageButton>Message</MessageButton>
            <GridContainer>
                <OneColumnCard label="Skills" />
                <OneColumnCard label="Tasks" />
                <OneColumnCard label="Your Groups" />
                <FullWidthCard label="Progress" />
                <TwoColumnCard label="Recommendations" />
            </GridContainer>
        </Container>
    );
};

export default UserProfileExternal;
