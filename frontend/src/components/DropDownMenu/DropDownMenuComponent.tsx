import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InventoryIcon from '@mui/icons-material/Inventory';
import TicketsIcon from '@mui/icons-material/ConfirmationNumber';
import SettingsIcon from '@mui/icons-material/Settings';
import { subscribeToUserModelSubject } from '../../observers/userobserver'; // Ensure this path is correct

const DropdownContainer = styled.div({
    position: 'absolute',
    top: '60px',
    right: '10px',
    width: '200px',
    border: '1px solid #dcdcdc',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    padding: '10px',
});

const ProfileSection = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px',
});

const ProfileIcon = styled(AccountCircleIcon)({
    fontSize: '40px',
    marginBottom: '5px',
    color: '#666666'
});

const ProfileName = styled.div({
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '4px',
});

const ProfileLink = styled(Link)({
    fontSize: '14px',
    color: '#000',
    textDecoration: 'none',
    marginBottom: '10px',
    '&:hover': {
        textDecoration: 'underline',
    },
});

const Divider = styled.div({
    width: '100%',
    height: '1px',
    backgroundColor: '#dcdcdc',
    margin: '10px 0',
});

const MenuItem = styled(Link)({
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0',
    textDecoration: 'none',
    fontSize: '14px',
    color: '#000', // Updated to black color for the text
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: '10px',
        padding: '10px',
    },
});

const MenuItemIcon = styled.div({
    marginRight: '10px',
    color: '#666666' // Ensure the icon color stays grey
});

const DropdownMenu = () => {
    const [userName, setUserName] = useState("User"); // Default name to "User" until fetched

    useEffect(() => {
        let unsubscribe: (() => void) | null | undefined = null;

        const setupSubscription = async () => {
            unsubscribe = await subscribeToUserModelSubject(user => {
                setUserName(user.name);  // Update to use the 'name' field
            });
        };

        setupSubscription();

        return () => {
            if (unsubscribe) {
                unsubscribe();  // Ensure proper cleanup on component unmount
            }
        };
    }, []);

    return (
        <DropdownContainer>
            <ProfileSection>
                <ProfileIcon />
                <ProfileName>{userName}</ProfileName>
                <ProfileLink to="/profile">View Profile</ProfileLink>
            </ProfileSection>
            <Divider />
            <MenuItem to="/wallet">
                <MenuItemIcon>
                    <WalletIcon />
                </MenuItemIcon>
                Wallet
            </MenuItem>
            <MenuItem to="/inventory">
                <MenuItemIcon>
                    <InventoryIcon />
                </MenuItemIcon>
                Inventory
            </MenuItem>
            <MenuItem to="/tickets">
                <MenuItemIcon>
                    <TicketsIcon />
                </MenuItemIcon>
                Tickets
            </MenuItem>
            <MenuItem to="/settings">
                <MenuItemIcon>
                    <SettingsIcon />
                </MenuItemIcon>
                Settings
            </MenuItem>
        </DropdownContainer>
    );
};

export default DropdownMenu;
