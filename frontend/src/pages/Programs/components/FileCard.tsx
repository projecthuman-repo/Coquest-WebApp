import { Typography, styled, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type Props = {
	fileName: string;
};
const CardWrapper = styled("div")({
	boxShadow: "2px 2px 10px 2px #0000004F",
	borderRadius: 20,
});

const CardImage = styled("div")({
	width: "100%",
	background: "#D9D9D9",
	height: 150,
	borderTopLeftRadius: 20,
	borderTopRightRadius: 20,
});

const CardDetail = styled("div")({
	display: "flex",
	padding: 10,
	paddingLeft: 15,
	justifyContent: "space-between",
	alignItems: "center",
});

const FileName = styled(Typography)({
	fontWeight: "bold",
});

const FileCard = (props: Props) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<CardWrapper>
				<CardImage></CardImage>
				<CardDetail>
					<FileName>{props.fileName}</FileName>
					<IconButton
						id="demo-positioned-button"
						aria-controls={
							open ? "demo-positioned-menu" : undefined
						}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						onClick={handleClick}
					>
						<MoreVertIcon />
					</IconButton>
				</CardDetail>
			</CardWrapper>
			<Menu
				id="demo-positioned-menu"
				aria-labelledby="demo-positioned-button"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				<MenuItem onClick={handleClose}>button 1</MenuItem>
				<MenuItem onClick={handleClose}>button 2</MenuItem>
				<MenuItem onClick={handleClose}>button 3</MenuItem>
			</Menu>
		</>
	);
};

export default FileCard;
