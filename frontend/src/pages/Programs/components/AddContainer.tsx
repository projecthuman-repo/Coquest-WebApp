import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";
import { IconButton, Typography } from "@mui/material";

const AddProfileContainer = styled("div")({
	display: "flex",
	alignItems: "center",
});

const AddButtonContainer = styled(IconButton)({
	padding: 0,
});

const AddButton = styled(AddIcon)({
	backgroundColor: "#D9D9D9",
	color: "#666666",
	borderRadius: "100px",
	padding: 2,
});

const AddProfileText = styled(Typography)({
	fontWeight: 500,
	marginLeft: 16,
});

export interface AddContainerProps {
	label: string;
	onClick?: () => void;
}

const AddContainer = ({ label, onClick }: AddContainerProps) => {
	return (
		<AddProfileContainer>
			<AddButtonContainer onClick={onClick ? onClick : undefined}>
				<AddButton />
			</AddButtonContainer>
			<AddProfileText>{label}</AddProfileText>
		</AddProfileContainer>
	);
};

export default AddContainer;
