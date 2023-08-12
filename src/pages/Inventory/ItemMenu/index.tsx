// Import libraries and components
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styled from '@emotion/styled';
import ItemModal from '../ItemModal';
import MoveModal from '../MoveModal';
import { Item } from '../ItemList';

// Start of component styling
const StyledIconButton = styled(IconButton)({
    padding: '10px 0'
});
const StyledMenuItem = styled(MenuItem)({
    fontWeight: 400,
    fontFamily: 'Poppins',
    fontSize: 16,
});
const StyledMenu = styled(Menu)({
    '& .MuiPaper-root': {
        width: '96px',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'
    }
});
const options = [
    'View',
    'Move',
    'Remove'
];
// End of component styling

type ItemMenuProps = {
    item: Item
};
const ItemMenu = ({ item }: ItemMenuProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // State of the item modal, same as in the ItemCard component
    const [isItemModalOpen, setIsItemModalOpen] = React.useState<boolean>(false);
    // State of the move modal, same as in the MoveModal component
    const [isMoveModalOpen, setIsMoveModalOpen] = React.useState<boolean>(false);

    const handleOptionClick = (option: string) => {
        switch (option) {
            case 'View':
                setIsItemModalOpen(true);
                break;
            case 'Move':
                setIsMoveModalOpen(true);
                break;
            case 'Remove':
                console.log('Remove was clicked');
                break;
            default:
                break;
        }
        handleClose();
    };

    return (
        <div>
            <ItemModal
                key={item.itemID}
                item={item}
                open={isItemModalOpen}
                onClose={() => setIsItemModalOpen(false)}
            />
            <MoveModal
                open={isMoveModalOpen}
                onClose={() => setIsMoveModalOpen(false)} />
            <StyledIconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </StyledIconButton>
            <StyledMenu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
            >
                {options.map((option) => (
                    <StyledMenuItem
                        key={option}
                        onClick={() => handleOptionClick(option)}>
                        {option}
                    </StyledMenuItem>
                ))}
            </StyledMenu>
        </div>
    );
}

export default ItemMenu;