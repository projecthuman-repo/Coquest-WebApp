import React, { useState, useContext } from "react";
import { Typography, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import BackButton from "../../../../components/Buttons/BackButton";
import FilterChip from "../../../../components/FilterChip";
import Assigned from "./Assigned";
import OpenRoles from "./OpenRoles";
import Released from "./Released";
import { ProgramContext, ProgramContextProvider } from "../ProgramContext";
import { ProgramsContextProvider } from "../../ProgramsContext";

const Container = styled("div")({
	display: "flex",
	margin: "auto",
	marginTop: 40,
	width: "70%",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
});

const TitleField = styled(Typography)(({ theme }) => ({
	marginTop: 5,
	fontWeight: 650,
	fontSize: 48,
	textAlign: "center",
	[theme.breakpoints.down("md")]: {
		fontSize: 32,
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: 26,
	},
}));

const Spacer = styled("div")({
	width: "100%",
	height: 26,
});

const Header = styled("div")(({ theme }) => ({
	width: "100%",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	[theme.breakpoints.down("sm")]: {
		flexDirection: "column",
	},
}));

const CustomTabs = styled(Tabs)({
	width: "100%",
	color: "black !important",
	display: "flex",
	justifyContent: "space-between",
});
const CustomTab = styled(Tab)({
	flex: "1",
	maxWidth: "33.333%",
	fontSize: "16px",
});
const tabStyle = {
	default_tab: {
		color: "#000000",
		opacity: 0.3,
		borderBottom: "2px solid rgba(0, 0, 0, 0.5)",
	},
	active_tab: {
		color: "#000000",
	},
};

const BackButtonContainer = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-start",
	width: "100%",
	marginBottom: 20,
});

const FilterContainer = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-start",
	width: "100%",
	marginBottom: 20,
	gap: 15,
	// make sure the filter chips stretch to the end of the container
	".filter-chip": {
		flex: 1,
	},
});

function TabPanel(props: any) {
	const { children, value, index } = props;

	return (
		<div hidden={value !== index} style={{ width: "100%" }}>
			{value === index && children}
		</div>
	);
}

const ProgramMembers = () => {
	const { program, setProgram } = useContext(ProgramContext);
	const [value, setValue] = useState("one");

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	function filterByRole() {
		if (program && program.openRoles) {
			program.openRoles.sort((a, b) => {
				return a.title.localeCompare(b.title);
			});
			setProgram({ ...program });
		}
	}

	function filterByProgram() {
		if (program && program.openRoles) {
			program.openRoles.sort((a, b) => {
				return a.program.localeCompare(b.program);
			});
			setProgram({ ...program });
		}
	}

	function filterByDate() {
		if (program && program.openRoles) {
			program.openRoles.sort((a, b) => {
				return (
					new Date(a.datePosted).getTime() -
					new Date(b.datePosted).getTime()
				);
			});
			setProgram({ ...program });
		}
	}

	function goBack() {
		window.history.go(-1);
		return false;
	}

	return (
		<Container>
			<BackButtonContainer>
				<BackButton onClick={goBack} />
			</BackButtonContainer>
			<Header>
				<TitleField>Members</TitleField>
			</Header>
			<Spacer />
			<CustomTabs
				TabIndicatorProps={{ style: { backgroundColor: "black" } }}
				value={value}
				onChange={handleChange}
				aria-label="wrapped label tabs example"
			>
				<CustomTab
					style={
						value === "one"
							? tabStyle.active_tab
							: tabStyle.default_tab
					}
					value="one"
					sx={{ textTransform: "none" }}
					label="Assigned"
					wrapped
				/>
				<CustomTab
					style={
						value === "two"
							? tabStyle.active_tab
							: tabStyle.default_tab
					}
					value="two"
					sx={{ textTransform: "none" }}
					label="Open Roles"
				/>
				<CustomTab
					style={
						value === "three"
							? tabStyle.active_tab
							: tabStyle.default_tab
					}
					value="three"
					sx={{ textTransform: "none" }}
					label="Released"
				/>
			</CustomTabs>
			<Spacer />
			<FilterContainer>
				<p>Filter by: </p>
				<FilterChip label="Role" onClick={filterByRole} />
				<FilterChip label="Program" onClick={filterByProgram} />
				<FilterChip label="Date posted" onClick={filterByDate} />
			</FilterContainer>
			<TabPanel value={value} index="one">
				<Assigned />
			</TabPanel>
			<TabPanel value={value} index="two">
				<ProgramsContextProvider>
					<ProgramContextProvider>
						<OpenRoles />
					</ProgramContextProvider>
				</ProgramsContextProvider>
			</TabPanel>
			<TabPanel value={value} index="three">
				<Released />
			</TabPanel>
		</Container>
	);
};

export default ProgramMembers;
