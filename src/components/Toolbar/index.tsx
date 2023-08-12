import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Link, Toolbar as MaterialToolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';

import styled from '@emotion/styled';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import InventoryIcon from '@mui/icons-material/Inventory';
import WalletIcon from '@mui/icons-material/Wallet';

type ProfileButtonProps = {
    name: string;
};

const Container = styled.div({
    position: 'absolute',
    zIndex: 3,
    width: '99.9%',
});

const ProfileContainer = styled.div({
    display: 'flex',
    marginRight: 30,

});
const ProfileImgContainer = styled.div({
    display: 'flex',
    position: 'absolute',
    left: 6,
    height: 50,
    width: 189,
    backgroundImage: `url()`,
    border: '1px solid red',
})
const ProfileIcon = styled(AccountCircleIcon)({
    color: 'rgba(0, 0, 0, 0.54)',
    marginRight: 5,
});
const SeeAllLink = styled(Typography)({
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    color: "#000000",
    textAlign: 'center'

})


const Toolbar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (anchorEl == null) {

            setAnchorEl(event.currentTarget);
        }
        else {
            setAnchorEl(null);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const ProfileButton = ({ name }: ProfileButtonProps) => (
        <ProfileContainer>

            <ProfileIcon />
            <Typography>{name}</Typography>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <ProfileIcon style={{}}
                    /> {name}
                </MenuItem>
                <SeeAllLink><Link href="#" color="#000000">
                    View Profile
                </Link></SeeAllLink>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <WalletIcon fontSize="small" />
                    </ListItemIcon>
                    Wallet
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <InventoryIcon fontSize="small" />
                    </ListItemIcon>
                    Inventory
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <LocalActivityIcon fontSize="small" />
                    </ListItemIcon>
                    Tickets

                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </ProfileContainer>
    );
    return (
        <Container>
            <AppBar >
                <MaterialToolbar>
                    <ProfileImgContainer />
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton>
                        <MessageIcon />
                    </IconButton>
                    <IconButton onClick={handleClick}>
                        <ProfileButton name='John Doe' />

                    </IconButton>
                </MaterialToolbar>
            </AppBar>
        </Container>
    )
};

export default Toolbar;
