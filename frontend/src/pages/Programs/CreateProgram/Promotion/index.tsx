import { Button, Grid, TextField, Typography, styled } from "@mui/material";
import React, { useState, useEffect } from "react";
import FileUploadComponent from "../../ProgramComponents/FileUploadComponent";
import InvitePeopleComponent from "../../ProgramComponents/InvitePeopleComponent";

const ContentView = styled("div")({
	minWidth: 300,
	display: "flex",
	flexDirection: "column",
	width: "60vw",
	maxWidth: 700,
	marginBottom: 140,
});
const TitleField = styled(Typography)({
	marginTop: 5,
	fontWeight: 600,
	fontSize: 24,
	textAlign: "center",
});
const Spacer = styled("div")({
	width: "100%",
	height: 26,
});
const SubtitleField = styled(Typography)({
	marginTop: 19,
	fontWeight: 600,
	fontSize: 16,
});
type StyledTextFieldProps = {
	label: string;
	placeholder: string;
};
const InviteGrid = styled(Grid)({
	display: "flex",
	alignItems: "center",
});

const StyledTextField = styled(TextField)<StyledTextFieldProps>`
	&& {
		width: 100%;
		.MuiInputLabel-shrink {
			color: black;
		}
		& .placeholder-mod::placeholder {
			color: #a1a1a1;
		}
	}
`;

const CopyButton = styled(Button)({
	borderColor: "black",
	color: "black",
	borderRadius: 25,
});
const GridItem = styled(Grid)({
	paddingTop: 50,
});
const Promotion = () => {
	const [sharelink, _setShareLink] = useState("sharelink.com/program");
	const [usernames, setUsernames] = useState<string[]>([]);

	useEffect(() => {
		const temp: string[] = ["@User1", "@User2", "@User3"];
		setUsernames(temp);
	}, []);

	const copyText = () => {
		navigator.clipboard.writeText(sharelink);
		alert("Program Invite Copied to clipboard");
	};
	return (
		<ContentView>
			<TitleField>Promote Prograam</TitleField>

			<SubtitleField>Set the promotion area of the program</SubtitleField>
			{/* THE FOLLOWING LINE OF CODE MUST BE COMMENTED OUT TO SHOW MAP */}
			{/* <MapComponent /> */}
			<SubtitleField>Add a header image</SubtitleField>
			<FileUploadComponent
				onFileUpload={() =>
					console.log("Promotion file upload -- Success")
				}
			/>
			<SubtitleField>Invite and Share</SubtitleField>
			<Spacer />
			<InviteGrid container spacing={1}>
				<Grid item xs={11}>
					<StyledTextField
						label="Share link"
						disabled
						placeholder="Provide a brief description of the position's responsibilities."
						className="placeholder-mod"
						value={sharelink}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<GridItem item xs={1}>
					<CopyButton variant="outlined" onClick={copyText}>
						Copy
					</CopyButton>
				</GridItem>
			</InviteGrid>
			<Spacer />
			<InvitePeopleComponent usernames={usernames} />
		</ContentView>
	);
};

export default Promotion;
