import React, { useState, useEffect } from "react";
import { Button, Typography, TextField, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import AddContainer from "../components/AddContainer";
import AvailabilityGrid from "../components/AvailabilityGrid";
import SkillsCertsSearch from "../components/SkillsCertsSearch";
import FileUploadComponent from "../components/FileUploadComponent";
import FileCard from "../components/FileCard";

const Container = styled("div")({
	display: "flex",
	margin: "auto",
	marginTop: 40,
	width: 600,
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
});

const TitleField = styled(Typography)({
	marginTop: 5,
	fontWeight: 600,
	fontSize: 24,
	textAlign: "center",
});

const BackButton = styled(Button)({
	color: "black",
	fontWeight: 700,
	textTransform: "none",
	fontSize: 16,
	borderRadius: 30,
});

const SaveButton = styled(Button)({
	marginLeft: 40,
	backgroundColor: "rgb(217, 217, 217)",
	color: "black",
	fontWeight: 700,
	textTransform: "none",
	fontSize: 16,
	borderRadius: 30,
});
const Header = styled("div")({
	width: "100%",
	display: "flex",
	justifyContent: "space-between",
	"& button:hover": {
		backgroundColor: "#c7c5c5",
	},
});

const Spacer = styled("div")({
	width: "100%",
	height: 26,
});

const SubtitleWrapper = styled("div")({
	width: "100%",
});

const SubtitleField = styled(Typography)({
	marginTop: 19,
	fontWeight: 800,
	fontSize: 16,
});

type StyledTextFieldProps = {
	label: string;
	placeholder: string;
};

type _Education = {
	level: string;
	institute: string;
	program: string;
	degree: string;
};

type _WorkExperience = {
	position: string;
	employer: string;
	location: string;
	jobResponsibilties: string;
	skills: string;
};
type _Reference = {
	fullName: string;
	email: string;
	phone: string;
};

type _Project = {
	name: string;
	type: string;
	description: string;
	completed: boolean;
};

const StyledTextField = styled(TextField)<StyledTextFieldProps>`
	&& {
		margin-top: 28px;
		width: 100%;
		.MuiInputLabel-shrink {
			color: black;
		}
		& .placeholder-mod::placeholder {
			color: #a1a1a1;
		}
	}
`;

const AddWrapper = styled("div")({
	width: "100%",
});

const EditProfile = () => {
	const [fullName, setFullName] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [address, setAddress] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [files, setFiles] = useState<any[]>([]);
	const [badgeNames, setBadgeNames] = useState<string[]>([]);

	const handleFileUpload = (file: any) => {
		setFiles([...files, file]); // add the file to the files state
	};

	// Fetches on page load
	useEffect(() => {
		const tempBadges: string[] = [];

		for (let i = 0; i <= 3; i++) {
			tempBadges.push(`Badge Name`);
		}
		setBadgeNames(tempBadges);
	}, []);

	const add = () => {
		console.log("Adding to be implemented");
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		switch (name) {
			case "fullName":
				setFullName(value);
				break;
			case "companyName":
				setCompanyName(value);
				break;
			case "address":
				setAddress(value);
				break;
			case "phoneNumber":
				setPhoneNumber(value);
				break;
			case "email":
				setEmail(value);
				break;
			default:
				break;
		}
	};

	return (
		<Container>
			<Header>
				<Link
					style={{ textDecoration: "none" }}
					to={`/programs/edit/profile`}
					onClick={() => {}}
				>
					<BackButton>{"<"} Back</BackButton>
				</Link>
				<TitleField>Edit Profile</TitleField>
				<SaveButton
					variant="contained"
					onClick={() => console.log("Saving")}
					disableElevation
				>
					Save
				</SaveButton>
			</Header>
			<Spacer />
			<StyledTextField
				label="Name"
				name="name"
				placeholder="Enter full name"
				className="placeholder-mod"
				value={fullName}
				onChange={handleInputChange}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<StyledTextField
				label="Company Name"
				name="companyName"
				placeholder="Enter company name"
				className="placeholder-mod"
				value={companyName}
				onChange={handleInputChange}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<StyledTextField
				label="Address"
				name="address"
				placeholder="Enter address here"
				className="placeholder-mod"
				value={address}
				onChange={handleInputChange}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<StyledTextField
				label="Phone number"
				name="phoneNumber"
				placeholder="XXX-XXX-XXX"
				className="placeholder-mod"
				value={phoneNumber}
				onChange={handleInputChange}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<StyledTextField
				label="Email"
				name="email"
				placeholder="example@gmail.com"
				className="placeholder-mod"
				value={email}
				onChange={handleInputChange}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<AddWrapper>
				<AddContainer label="Add education" onClick={add} />
				<AddContainer label="Add work experience" onClick={add} />
				<AddContainer label="Add certification" onClick={add} />
			</AddWrapper>
			<Spacer />
			<SubtitleWrapper>
				<SubtitleField>Availability</SubtitleField>
				<Spacer />
			</SubtitleWrapper>
			<AvailabilityGrid />
			<SubtitleWrapper>
				<Spacer />
				<SubtitleField>Projects</SubtitleField>
			</SubtitleWrapper>
			<AddWrapper>
				<AddContainer label="Add project" onClick={add} />
			</AddWrapper>
			<Spacer />
			{/*  The followinhg skills and certs search feature is a reused component,
			but does not print skills and certs, instead prints badge names */}
			<AddWrapper>
				<SkillsCertsSearch
					skills={badgeNames}
					label="Search Badges and Rewards"
				/>
			</AddWrapper>
			<SubtitleWrapper>
				<Spacer />
				<SubtitleField>References</SubtitleField>
			</SubtitleWrapper>
			<AddWrapper>
				<AddContainer label="Add personal references" onClick={add} />
			</AddWrapper>
			<SubtitleWrapper>
				<Spacer />
				<SubtitleField>Document and media</SubtitleField>
			</SubtitleWrapper>
			<AddWrapper>
				<Spacer />
				<FileUploadComponent onFileUpload={handleFileUpload} />
				<Spacer />
				<Grid
					container
					spacing={{ xs: 2, md: 4, lg: 2 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
				>
					{files.map((file, index) => (
						<Grid item xs={2} sm={4} md={4} key={index}>
							<FileCard fileName={file.name} />
						</Grid>
					))}
				</Grid>
			</AddWrapper>
			<Spacer />
			<Spacer />
			<Spacer />
		</Container>
	);
};

export default EditProfile;
