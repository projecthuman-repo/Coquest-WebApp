// Import libraries and components
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// Start of component styling
const StyledBox = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 783,
    height: 487,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    fontFamily: 'Poppins',
    display: 'flex'
});
const BackButton = styled(ArrowBackIosIcon)({
    height: 24,
    width: 20,
    color: '#666666',
    marginLeft: 32,
    marginTop: 28,
    cursor: 'pointer',
    position: 'absolute',
    left: 0,
    top: 0,
})
const MoveContent = styled(Typography)({
    width: 718,
    height: 105,
    margin: '70px 30px'
});
const MoveItem = styled(Typography)({
    fontWeight: 600,
    fontSize: 20,
    marginBottom: 20
});
const SelectBox = styled(Box)({
    borderRadius: 10,
    padding: '24px 20px',
    marginBottom: 20,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    border: '1px solid #FFFFFF',
    '&:hover': {
        border: '1px solid #000000',
        cursor: 'pointer'
    }
});
const Name = styled(Typography)({
    fontWeight: 600,
    fontSize: 20
});
const Description = styled(Typography)({
    fontWeight: 400,
    fontSize: 14
})
const MoveButton = styled(Button)({
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    height: 40,
    width: 132,
    textTransform: 'none',
    color: '#000000',
    fontWeight: 500,
    fontSize: 16,
    marginLeft: 580,
    marginBottom: 40,
    marginTop: 60,
    '&:hover': {
        backgroundColor: '#D9D9D9'
    }
});
const CloseModalIcon = styled(CloseIcon)({
    color: 'grey',
    marginRight: 28,
    marginTop: 28,
    cursor: 'pointer',
    position: 'absolute',
    right: 0,
    top: 0,
});
// Start of component styling

// Assign props
type MoveModalProps = {
    open: boolean,
    onClose: () => void
};
// Pass props
const MoveModal = ({ open, onClose }: MoveModalProps) => {
    // State of the move modal, same as in the ItemMenu component
    const [isItemModalOpen, setIsItemModalOpen] = React.useState<boolean>(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyledBox>
                    <BackButton
                        onClick={onClose}
                    />
                    <MoveContent>
                        <MoveItem>
                            Move item to
                        </MoveItem>
                        <SelectBox>
                            <Name>
                                Program name
                            </Name>
                            <Description>
                                Description. Lorem ipsum dolor sit amet consectetur. Nisl sollicitudin aliquam quam.
                            </Description>
                        </SelectBox>
                        <SelectBox>
                            <Name>
                                Project name
                            </Name>
                            <Description>
                                Description. Lorem ipsum dolor sit amet consectetur. Nisl sollicitudin aliquam quam.
                            </Description>
                        </SelectBox>
                        <MoveButton>
                            Move here
                        </MoveButton>
                    </MoveContent>
                    <CloseModalIcon
                        onClick={onClose}
                    />
                </StyledBox>
            </Modal>
        </div >
    );
}

export default MoveModal;