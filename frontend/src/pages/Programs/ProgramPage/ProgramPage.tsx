import React from "react";
import { Typography, Tab, Tabs, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Program } from "../ProgramComponents/TypeDefinitions/Program";

interface ProgramPageProps {
	program: Program;
}

const Container = styled("div")({
	display: "flex",
	margin: "auto",
	marginTop: 40,
	width: "70%",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
});
const TitleField = styled(Typography)({
	marginTop: 5,
	fontWeight: 600,
	fontSize: "3vw",
	textAlign: "center",
});
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

const _CustomTabs = styled(Tabs)({
	width: "100%",
	color: "black !important",
});
const _CustomTab = styled(Tab)({
	width: "33.33%",
});
const _tabStyle = {
	default_tab: {
		color: "#000000",
		opacity: 0.3,
	},
	active_tab: {
		color: "#000000",
	},
};

function _TabPanel(props: any) {
	const { children, value, index } = props;

	return <div hidden={value !== index}>{value === index && children}</div>;
}

const ProgramPage = (_props: ProgramPageProps) => {
	return (
		<Container>
			<Header>
				<TitleField>Programs</TitleField>
				<Button />
			</Header>
			<Spacer />
		</Container>
	);
};

export default ProgramPage;
