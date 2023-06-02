import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";
import { IconButton, Typography } from "@mui/material";

const AddProfileContainer = styled("div")({
	marginTop: 26,
	display: "flex",
	alignItems: "center",
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
			<IconButton>
				<AddButton onClick={onClick} />
			</IconButton>
			<AddProfileText>{label}</AddProfileText>
		</AddProfileContainer>
	);
};

export default AddContainer;
