import styled from "@emotion/styled";
import {
	Card,
	CardHeader,
	CardMedia,
	Checkbox,
	Chip,
	FormControlLabel,
	FormGroup,
	IconButton,
	InputAdornment,
	MenuItem,
	Skeleton,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import SearchIcon from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/Done";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Header from "../../CoopComponents/CoopTemplate/header";
import Form from "../../CoopComponents/CoopTemplate/form";
import Page from "../../CoopComponents/CoopTemplate/page";
import { useOutletContext } from "react-router";
import { CreateCoopOutletContext, CreateCoopProps } from "../CreateCoop";

const categories = [
	{
		label: "Community Gardens - Food and Agriculture",
	},
	{
		label: "Food Processing Co-ops - Food and Agriculture",
	},
	{
		label: "(Raw and Processed) Food Delivery System - Agriculture",
	},
	{
		label: "Green Powered Micro-Grids - Energy",
	},
	{
		label: "Goods and Craft collectives - Community Art",
	},
];

function Categories({ updateCreateCoopData, createCoopData }: CreateCoopProps) {
	return (
		<TextField
			select
			label="Co-op type"
			onChange={(e) => {
				updateCreateCoopData({ type: e.target.value });
			}}
			value={createCoopData.type ?? ""}
		>
			{categories.map((option) => (
				<MenuItem key={option.label} value={option.label}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	);
}

function Summary({ updateCreateCoopData, createCoopData }: CreateCoopProps) {
	return (
		<TextField
			label="Co-op Summary"
			multiline
			rows={4}
			fullWidth
			value={createCoopData.summary ?? ""}
			onChange={(e) => updateCreateCoopData({ summary: e.target.value })}
		/>
	);
}

function Mission({ updateCreateCoopData, createCoopData }: CreateCoopProps) {
	return (
		<TextField
			label="Mission"
			multiline
			rows={5}
			fullWidth
			value={createCoopData.mission ?? ""}
			onChange={(e) => updateCreateCoopData({ mission: e.target.value })}
		/>
	);
}

function CheckBox({ updateCreateCoopData, createCoopData }: CreateCoopProps) {
	return (
		<FormGroup>
			<FormControlLabel
				control={
					<Checkbox
						icon={<RadioButtonUncheckedIcon />}
						checkedIcon={<RadioButtonCheckedIcon />}
						size="small"
						color="default"
						defaultChecked={createCoopData.locationAllowed ?? false}
						onChange={(e) =>
							updateCreateCoopData({
								locationAllowed: e.target.checked,
							})
						}
					/>
				}
				label="Allow for location information"
			/>
			<FormControlLabel
				control={
					<Checkbox
						icon={<RadioButtonUncheckedIcon />}
						checkedIcon={<RadioButtonCheckedIcon />}
						size="small"
						color="default"
						defaultChecked={createCoopData.notificationAllowed ?? false}
						onChange={(e) =>
							updateCreateCoopData({
								notificationAllowed: e.target.checked,
							})
						}
					/>
				}
				label="Notification ON/OFF"
			/>
		</FormGroup>
	);
}

function SearchBar() {
	const SearchBox = styled(TextField)(() => ({
		"& fieldset": {
			borderRadius: "25px",
		},
	}));

	const Container = styled.div({
		display: "flex",
		flexDirection: "column",
		gap: 15,
	});

	return (
		<Container>
			<Typography variant="body2">
				Search for similar co-ops in area:
			</Typography>
			<SearchBox
				placeholder="Search…"
				variant="outlined"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
			<Stack direction="row" spacing={1}>
				<Chip icon={<DoneIcon />} label="Co-op" size="small" />
				<Chip icon={<DoneIcon />} label="Co-op name" size="small" />
			</Stack>
			<Skeleton variant="rectangular" width={"100%"} height={500}>
				Map is Loading...
			</Skeleton>
		</Container>
	);
}

function CoopCard() {
	return (
		<Card
			style={{
				width: 215,
				height: 225,
			}}
		>
			<CardMedia
				sx={{ height: 160, width: 230 }}
				src="./placeholder"
				title="photo"
			/>
			<CardHeader
				action={
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				}
				titleTypographyProps={{
					fontSize: 10,
					fontWeight: 400,
				}}
				subheaderTypographyProps={{
					fontSize: 16,
					fontWeight: 600,
				}}
				title="LOCATION"
				subheader="Co-op name"
			></CardHeader>
		</Card>
	);
}

const CardContainer = styled.div({
	display: "flex",
	justifyContent: "space-between",
	alightItem: "center",
	flexWrap: "wrap",
	gap: 25,
});

function CoopBasicInformation() {
	const { updateCreateCoopData, createCoopData } =
		useOutletContext<CreateCoopOutletContext>();

	return (
		<Page>
			<Form>
				<Header text="Start a Co-op" />
				<TextField
					label="Co-op name"
					value={createCoopData.name ?? ""}
					onChange={(e) =>
						updateCreateCoopData({ name: e.target.value })
					}
				></TextField>
				<Categories
					updateCreateCoopData={updateCreateCoopData}
					createCoopData={createCoopData}
				/>
				<Summary
					updateCreateCoopData={updateCreateCoopData}
					createCoopData={createCoopData}
				/>
				<Mission
					updateCreateCoopData={updateCreateCoopData}
					createCoopData={createCoopData}
				/>
				<CheckBox
					updateCreateCoopData={updateCreateCoopData}
					createCoopData={createCoopData}
				/>
				<SearchBar />

				<CardContainer>
					<CoopCard />
					<CoopCard />
					<CoopCard />
					<CoopCard />
					<CoopCard />
					<CoopCard />
				</CardContainer>
			</Form>
		</Page>
	);
}

export default CoopBasicInformation;
