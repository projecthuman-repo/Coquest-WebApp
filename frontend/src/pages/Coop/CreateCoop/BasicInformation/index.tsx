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

// const CoopInfo = () => {
//     // const Container = styled.div({
//     //     display: "flex",
//     //     flexDirection: "column",
//     //     gap: 40,
//     // });

//     return (
//         // <Container>
//         // <TextField label="Co-op name"></TextField>
//         // <FormControl>
//         //     <InputLabel>Co-op type</InputLabel>
//         //     <Select id="outlined" label="cost to participate">
//         //         <MenuItem
//         //             value={"Community Gardens - Food and Agriculture"}
//         //         >
//         //             Community Gardens - Food and Agriculture
//         //         </MenuItem>
//         //         <MenuItem
//         //             value={"Food Processing Co-ops - Food and Agriculture"}
//         //         >
//         //             Food Processing Co-ops - Food and Agriculture
//         //         </MenuItem>
//         //         <MenuItem
//         //             value={
//         //                 "(Raw and Processed) Food Delivery System - Agriculture"
//         //             }
//         //         >
//         //             (Raw and Processed) Food Delivery System - Agriculture
//         //         </MenuItem>
//         //         <MenuItem
//         //             value={"Goods and Craft collectives - Community Art"}
//         //         >
//         //             Goods and Craft collectives - Community Art
//         //         </MenuItem>
//         //     </Select>
//         // </FormControl>
//         // <TextField label="Co-op Summary" multiline rows={4} fullWidth />
//         // <TextField label="Mission" multiline rows={5} fullWidth />
//         // </Container>
//     );
// };

function Categories() {
	return (
		<TextField select label="Co-op type">
			{categories.map((option) => (
				<MenuItem key={option.label} value={option.label}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	);
}

function Summary() {
	return <TextField label="Co-op Summary" multiline rows={4} fullWidth />;
}

function Mission() {
	return <TextField label="Mission" multiline rows={5} fullWidth />;
}

function CheckBox() {
	return (
		<FormGroup>
			<FormControlLabel
				control={
					<Checkbox
						icon={<RadioButtonUncheckedIcon />}
						checkedIcon={<RadioButtonCheckedIcon />}
						size="small"
						color="default"
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
				image=""
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
	return (
		<Page>
			<Form>
				<Header text="Start a Co-op" />
				<TextField label="Co-op name"></TextField>
				<Categories />
				<Summary />
				<Mission />
				<CheckBox />
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
