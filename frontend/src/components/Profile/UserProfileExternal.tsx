import React from 'react';
import styled from '@emotion/styled';
import { User } from '../../models/usermodel';

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
                    <i className="fab fa-facebook"></i>
                </Icon>
                <Icon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                </Icon>
                <Icon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                </Icon>
                <Icon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                </Icon>
            </SocialMediaIcons>
        </Container>
    );
};

export default UserProfileExternal;
