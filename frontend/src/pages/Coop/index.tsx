import React, { useContext } from "react";
import { Typography, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import SearchBar from "../../components/SearchBar";
//import ProgramListDisplay from "./components/ViewAllPrograms/ProgramListDisplay";
//import ProgramPane from "./components/ViewAllPrograms/ProgramPane";
import CoopListDisplay from "./components/ViewAllCoops/CoopListDisplay";
//import CoopPane from "./components/ViewAllCoops/CoopPane";

//import { populatedPrograms } from "../../testing/TestProgramsData";
import { CoopsContext } from "./CoopsContext";

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

function TabPanel(props: any) {
	const { children, value, index } = props;

	return <div hidden={value !== index}>{value === index && children}</div>;
}

const ViewAllCoops = () => {
	const { coops } = useContext(CoopsContext);
	const [value, setValue] = React.useState("one");

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<Container>
			<Header>
				<TitleField>Co-ops</TitleField>
				<SearchBar placeholder="Search nearby" />
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
					label="Created by me"
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
					label="Participating in"
				/>
				<CustomTab
					style={
						value === "three"
							? tabStyle.active_tab
							: tabStyle.default_tab
					}
					value="three"
					sx={{ textTransform: "none" }}
					label="Completed"
				/>
			</CustomTabs>
			<TabPanel value={value} index="one">
				<CoopListDisplay coopList={coops} />
			</TabPanel>
			<TabPanel value={value} index="two">
				<div className="">Second page</div>
			</TabPanel>
			<TabPanel value={value} index="three">
				<div className="">Third page</div>
			</TabPanel>
		</Container>
	);
};

export default ViewAllCoops;
