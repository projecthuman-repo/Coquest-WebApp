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
import { useOutletContext } from "react-router";
import { CreateCoopOutletContext, CreateCoopProps } from "../CreateCoop";

const TimeDate = ({
	updateCreateCoopData,
	createCoopData,
}: CreateCoopProps) => {
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
						value={createCoopData.startDate ?? ""}
						onChange={(e) =>
							updateCreateCoopData({ startDate: e.target.value })
						}
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
						value={createCoopData.endDate ?? ""}
						onChange={(e) =>
							updateCreateCoopData({ endDate: e.target.value })
						}
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
						value={createCoopData.startTime ?? ""}
						onChange={(e) =>
							updateCreateCoopData({ startTime: e.target.value })
						}
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
						value={createCoopData.endTime ?? ""}
						onChange={(e) =>
							updateCreateCoopData({ endTime: e.target.value })
						}
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
					<RadioGroup
						value={createCoopData.recurring}
						onChange={(e) => {
							updateCreateCoopData({
								// @ts-expect-error - Type 'string' is not assignable to type 'RecurringType',
								// TODO: Figure out a type safe way to do it instead of 'as RecurringType' assertion
								recurring: e.target.value,
							});
						}}
					>
						<CustomRadio
							value="DAILY"
							control={<Radio size="small" color="default" />}
							label={
								<Typography variant="body2">Daily</Typography>
							}
						/>
						<CustomRadio
							value="WEEKLY"
							control={<Radio size="small" color="default" />}
							label={
								<Typography variant="body2">Weekly</Typography>
							}
						/>
						<CustomRadio
							value="MONTHLY"
							control={<Radio size="small" color="default" />}
							label={
								<Typography variant="body2">Monthly</Typography>
							}
						/>
						<CustomRadio
							value="CUSTOM"
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

const Container = styled.div({
	display: "flex",
	flexDirection: "column",
	gap: 15,
});

const Location = ({
	updateCreateCoopData,
	createCoopData,
}: CreateCoopProps) => {
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
						value={createCoopData.radius ?? ""}
						onChange={(e) =>
							updateCreateCoopData({ radius: e.target.value })
						}
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
				<RadioGroup
					value={String(createCoopData.haveNeutralMeetingSpace)}
					onChange={(e) => {
						updateCreateCoopData({
							// converting to boolean
							haveNeutralMeetingSpace: e.target.value === "true",
						});
					}}
				>
					<CustomRadio
						value={"true"}
						control={<Radio size="small" color="default" />}
						label={<Typography variant="body2">Yes</Typography>}
					/>
					<CustomRadio
						value={"false"}
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
				value={createCoopData.additionalInfo ?? ""}
				onChange={(e) =>
					updateCreateCoopData({ additionalInfo: e.target.value })
				}
			/>
		</Container>
	);
};

function CoopOperations() {
	const { updateCreateCoopData, createCoopData } =
		useOutletContext<CreateCoopOutletContext>();
	return (
		<>
			<Page>
				<Form>
					<Header text="Operations" />
					<Typography>
						<b>Time, date and location</b>
					</Typography>
					<TimeDate
						updateCreateCoopData={updateCreateCoopData}
						createCoopData={createCoopData}
					/>
					<Location
						updateCreateCoopData={updateCreateCoopData}
						createCoopData={createCoopData}
					/>
				</Form>
			</Page>
		</>
	);
}

export default CoopOperations;
