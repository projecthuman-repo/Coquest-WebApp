// Import libraries and components
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import MoveModal from '../MoveModal';
import { Item } from '../ItemList';

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
const ItemImage = styled.div({
	width: 407,
	heigth: 407,
	margin: 40
});
const ItemContent = styled(Typography)({
	width: 277,
	height: 339,
	marginTop: 60
});
const TaskName = styled(Typography)({
	variant: 'overline',
	fontWeight: 400,
	fontSize: 12,
	lineHeight: '18px'
});
const ItemName = styled(Typography)({
	variant: 'subtitle1',
	fontWeight: 600,
	fontSize: 20,
	lineHeight: '30px'
});
const ItemDescription = styled(Typography)({
	fontWeight: 400,
	fontSize: 14,
	marginTop: 10,
	lineHeight: '21px',
	width: 265
});
const InfoStack = styled(Stack)({
	marginTop: 10
})
const ItemHeader = styled(Typography)({
	width: 84,
	height: 96,
	fontWeight: 600,
	fontSize: 12,
	lineHeight: '24px'
});
const ItemSub = styled(Typography)({
	height: 96,
	fontWeight: 400,
	fontSize: 12,
	lineHeight: '24px'
});
const ButtonStack = styled(Stack)({
	position: 'absolute',
	bottom: 70,
	right: 70,
	display: 'flex',
	justifyContent: 'flex-end',
});
const RemoveButton = styled(Button)({
	color: '#BA4B4B',
	border: 'none',
	textTransform: 'none',
	height: 40,
	width: 144,
	fontWeight: 500,
	fontSize: 16,
	'&:hover': {
		border: 'none',
		backgroundColor: '#FFFFFF'
	}
});
const MoveButton = styled(Button)({
	color: '#000000',
	textTransform: 'none',
	border: '1px solid #000000',
	borderRadius: '20px',
	height: 40,
	width: 92,
	'&:hover': {
		border: '1px solid #000000',
		backgroundColor: '#FFFFFF'
	}
});
const CloseModalIcon = styled(CloseIcon)({
	color: 'grey',
	marginRight: 28,
	marginTop: 28,
	cursor: 'pointer'
});
// End of component styling

// Assign props
type ItemModalProps = {
	item: Item,
	open: boolean,
	onClose: () => void,
};
const ItemModal = ({
	item,
	open,
	onClose,
}: ItemModalProps) => {
	const {
		itemID,
		image,
		itemName,
		description,
		taskLink,
		history,
		createdAt
	} = item; // Assign data props as item
	// State of the move modal, same as in the ItemCard, and ItemMenu components
	const [isMoveModalOpen, setIsMoveModalOpen] = React.useState<boolean>(false);
	return (
		<div>
			<Modal
				open={open}
				onClose={onClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<StyledBox>
					<ItemImage>
						<img src={image}
							width="407"
							height="407"
							alt="Item image"
						/>
					</ItemImage>
					<ItemContent>
						<TaskName>
							Task Name
						</TaskName>
						<ItemName>
							{itemName}
						</ItemName>
						<ItemDescription>
							{description}
						</ItemDescription>
						<InfoStack
							direction="row"
							spacing={2}>
							<ItemHeader>
								<div>Group name:</div>
								<div>Task:</div>
								<div>Owned by:</div>
								<div>Date:</div>
							</ItemHeader>
							<ItemSub>
								<div>Group Name</div>
								<div style={{ textDecoration: 'underline' }}>{taskLink}</div>
								<div>{history}</div>
								<div>
									{new Date(createdAt).toLocaleDateString(undefined, {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</div>
							</ItemSub>
						</InfoStack>
						<ButtonStack
							direction="row"
							spacing={2}
						>
							<RemoveButton
								variant="outlined"
								startIcon={<DeleteIcon />}
							>
								Remove
							</RemoveButton>
							<MoveButton
								onClick={() => setIsMoveModalOpen(true)}>
								Move
							</MoveButton>
						</ButtonStack>
					</ItemContent>
					<CloseModalIcon
						onClick={onClose} />
					<MoveModal
						open={isMoveModalOpen}
						onClose={() => setIsMoveModalOpen(false)} />
				</StyledBox>
			</Modal>
		</div >
	);
}

export default ItemModal;