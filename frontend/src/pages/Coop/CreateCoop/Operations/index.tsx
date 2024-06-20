import React from "react";
import styled from "@emotion/styled";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import {
	FormControl,
	FormControlLabel,
	InputAdornment,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	Skeleton,
	TextField,
	Typography,
} from "@mui/material";
import Form from "../../CoopComponents/CoopTemplate/form";
import Header from "../../CoopComponents/CoopTemplate/header";
import Page from "../../CoopComponents/CoopTemplate/page";

const TimeDate = () => {
	const Container = styled.div({
		display: "flex",
		// justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		gap: 15,
	});

	const DropDownCont = styled.div({
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 25,
		// border: "1px solid",
	});

	const DropDown = styled(FormControl)({
		width: 220,
	});

	const RadioContainer = styled.div({
		width: 465,
	});

	const CustomRadio = styled(FormControlLabel)({
		marginLeft: 5,
		height: 30,
	});

	return (
		<Container>
			<DropDownCont>
				<DropDown>
					<InputLabel>Start date</InputLabel>
					<Select
						startAdornment={
							<InputAdornment position="start">
								<EventIcon />
							</InputAdornment>
						}
						id="outlined"
						label="Start date"
					>
						<MenuItem value={"Jan"}>Jan</MenuItem>
						<MenuItem value={"Sept"}>Sept</MenuItem>
						<MenuItem value={"Dec"}>Dec</MenuItem>
					</Select>
				</DropDown>
				<DropDown>
					<InputLabel>End date</InputLabel>
					<Select
						startAdornment={
							<InputAdornment position="start">
								<EventIcon />
							</InputAdornment>
						}
						id="outlined"
						label="End date"
					>
						<MenuItem value={"Jan"}>Jan</MenuItem>
						<MenuItem value={"Sept"}>Sept</MenuItem>
						<MenuItem value={"Dec"}>Dec</MenuItem>
					</Select>
				</DropDown>
				<DropDown>
					<InputLabel>Start date</InputLabel>
					<Select
						startAdornment={
							<InputAdornment position="start">
								<AccessTimeIcon />
							</InputAdornment>
						}
						id="outlined"
						label="Start time"
					>
						<MenuItem value={"Jan"}>Jan</MenuItem>
						<MenuItem value={"Sept"}>Sept</MenuItem>
						<MenuItem value={"Dec"}>Dec</MenuItem>
					</Select>
				</DropDown>
				<DropDown>
					<InputLabel>End time</InputLabel>
					<Select
						startAdornment={
							<InputAdornment position="start">
								<AccessTimeIcon />
							</InputAdornment>
						}
						id="outlined"
						label="End time"
					>
						<MenuItem value={"Jan"}>Jan</MenuItem>
						<MenuItem value={"Sept"}>Sept</MenuItem>
						<MenuItem value={"Dec"}>Dec</MenuItem>
					</Select>
				</DropDown>
			</DropDownCont>
			<RadioContainer>
				<FormControl>
					<Typography variant="body2"> Recurring:</Typography>
					<RadioGroup>
						<CustomRadio
							value="daily"
							control={<Radio size="small" color="default" />}
							label={
								<Typography variant="body2">Daily</Typography>
							}
						/>
						<CustomRadio
							value="weekly"
							control={<Radio size="small" color="default" />}
							label={
								<Typography variant="body2">Weekly</Typography>
							}
						/>
						<CustomRadio
							value="monthly"
							control={<Radio size="small" color="default" />}
							label={
								<Typography variant="body2">Monthly</Typography>
							}
						/>
						<CustomRadio
							value="custom"
							control={<Radio size="small" color="default" />}
							label={
								<Typography variant="body2">Custom</Typography>
							}
						/>
					</RadioGroup>
				</FormControl>
			</RadioContainer>
		</Container>
	);
};

const Location = () => {
	const Container = styled.div({
		display: "flex",
		flexDirection: "column",
		gap: 15,
	});

	const Cont = styled.div({
		display: "flex",
		justifyContent: "space-between",
	});

	const SearchLocation = styled(TextField)(() => ({
		"& fieldset": {
			borderRadius: "25px",
			width: 550,
		},
	}));

	const DropDown = styled(FormControl)({
		width: 120,
	});

	const MapContainer = styled.div({
		display: "flex",
		justifyContent: "center",
	});

	const SearchVenues = styled(TextField)(() => ({
		"& fieldset": {
			borderRadius: "25px",
			width: 450,
		},
	}));

	const CustomRadio = styled(FormControlLabel)({
		height: 30,
	});

	return (
		<Container>
			<Typography variant="body2">Select Co-op locations:</Typography>
			<Cont>
				<SearchLocation
					placeholder="Search location"
					variant="outlined"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
				<DropDown>
					<InputLabel>Radius</InputLabel>
					<Select
						startAdornment={
							<InputAdornment position="start"></InputAdornment>
						}
						id="outlined"
						label="Radius"
					>
						<MenuItem value={"20 km"}>20 km</MenuItem>
						<MenuItem value={"50 km"}>50 km</MenuItem>
						<MenuItem value={"100 km"}>100 km</MenuItem>
					</Select>
				</DropDown>
			</Cont>
			<MapContainer>
				<Skeleton variant="rectangular" width={"90%"} height={600}>
					Map is Loading...
				</Skeleton>
			</MapContainer>
			<FormControl>
				<Typography variant="body2">
					Do you have a neutral meeting space?
				</Typography>
				<RadioGroup>
					<CustomRadio
						value="yes"
						control={<Radio size="small" color="default" />}
						label={<Typography variant="body2">Yes</Typography>}
					/>
					<CustomRadio
						value="no"
						control={<Radio size="small" color="default" />}
						label={<Typography variant="body2">No</Typography>}
					/>
				</RadioGroup>
			</FormControl>
			<SearchVenues
				placeholder="Search venues"
				variant="outlined"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
			<TextField
				label="Additional information for rentals"
				multiline
				rows={4}
				fullWidth
			/>
		</Container>
	);
};

function CoopOperations() {
	return (
		<>
			<Page>
				<Form>
					<Header text="Operations" />
					<Typography>
						<b>Time, date and location</b>
					</Typography>
					<TimeDate />
					<Location />
				</Form>
			</Page>
		</>
	);
}

export default CoopOperations;
