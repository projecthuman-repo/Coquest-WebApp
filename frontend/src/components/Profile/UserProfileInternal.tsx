import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import SimpleCard from '../../components/SimpleCard/SimpleCard';
import { subscribeToUserModelSubject } from '../../observers/userobserver';
import { User } from '../../models/usermodel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const BackgroundPhoto = styled.div`
  width: 100%;
  height: 200px;
  background-color: #e0e0e0;
  position: relative;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: absolute;
  left: 70px;
  bottom: -50px;
  border: 2px solid white;
  background-color: white;
`;

const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  
`;

const Username = styled.h1`
  font-size: 30px;
  margin-left: 20px;
`;

const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-right: 20px;
`;

const Icon = styled.a`
  color: #000;
  font-size: 24px;
  &:hover {
    color: #007bff;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 70%;
  margin-top: 26px;
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

interface DropdownProps {
    visible: boolean;
    top: number;
    left: number;
}

const DropdownContainer = styled.div<DropdownProps>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: 200px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 10px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 8px 0;
  text-decoration: none;
  font-size: 14px;
  color: #000;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 10px;
  }
`;

const MenuItemIcon = styled.div`
  margin-right: 10px;
  color: #666666;
`;

const MenuIconContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserProfileInternal: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const menuIconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let unsubscribe: (() => void) | null | undefined = null;

        const setupSubscription = async () => {
            unsubscribe = await subscribeToUserModelSubject((user) => {
                setUser(user);
            });
        };

        setupSubscription();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    useEffect(() => {
        if (menuIconRef.current) {
            const rect = menuIconRef.current.getBoundingClientRect();
            setMenuPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
        }
    }, [menuVisible]);

    if (!user) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container>
            <BackgroundPhoto>
                <Avatar src={user.images?.[0]?.path || '/default-avatar.png'} alt="User Avatar" />
            </BackgroundPhoto>
            <UsernameContainer>
                <Username>{user.name}</Username>
                <SocialMediaIcons>
                    <Icon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon />
                    </Icon>
                    <Icon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FacebookIcon />
                    </Icon>
                    <Icon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <TwitterIcon />
                    </Icon>
                    <Icon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon />
                    </Icon>
                    <MenuIconContainer ref={menuIconRef} onClick={() => setMenuVisible(!menuVisible)}>
                        <MenuIcon />
                    </MenuIconContainer>
                </SocialMediaIcons>
            </UsernameContainer>
            <DropdownContainer visible={menuVisible} top={menuPosition.top} left={menuPosition.left}>
                <MenuItem to="/edit-profile">
                    <MenuItemIcon>
                        <EditIcon />
                    </MenuItemIcon>
                    Edit profile
                </MenuItem>
                <MenuItem to="/settings">
                    <MenuItemIcon>
                        <SettingsIcon />
                    </MenuItemIcon>
                    Settings
                </MenuItem>
                <MenuItem to="/saved">
                    <MenuItemIcon>
                        <BookmarkIcon />
                    </MenuItemIcon>
                    Saved
                </MenuItem>
                <MenuItem to="/connect-social-media">
                    <MenuItemIcon>
                        <GroupAddIcon />
                    </MenuItemIcon>
                    Connect social media
                </MenuItem>
            </DropdownContainer>
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

export default UserProfileInternal;
