import styled from "@emotion/styled";
import React from "react";
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EventIcon from "@mui/icons-material/Event";
import Header from "../../CoopComponents/CoopTemplate/header";
import Page from "../../CoopComponents/CoopTemplate/page";

const Form = styled.div({
	display: "flex",
	flexDirection: "column",
	gap: 20,
	width: 1000,
});

const SuppliesandMaterialsComponent = () => {
	const Cont = styled.div({
		display: "flex",
		flexDirection: "row",
		gap: 10,
	});

	const Label = styled.div({
		display: "flex",
		flexDirection: "column",
		gap: 10,
	});

	const ItemLabel = styled(TextField)({
		display: "flex",
		width: 200,
	});

	const Item = styled(TextField)({
		display: "flex",
		width: 200,
		marginTop: 31.5,
	});

	const Quantity = styled(TextField)({
		display: "flex",
		width: 100,
	});

	const Coste = styled(TextField)({
		display: "flex",
		width: 100,
	});

	const Costt = styled(TextField)({
		display: "flex",
		width: 100,
	});

	const ButtonCont = styled(IconButton)({
		display: "flex",
		marginTop: 45,
		height: 30,
		width: 30,
	});

	return (
		<Cont>
			<Label>
				<Typography variant="body2">Item</Typography>
				<ItemLabel label="Item 1" variant="outlined" />
			</Label>
			<Item label="Item 2" variant="outlined" />
			<Item label="Item 3" variant="outlined" />
			<Label>
				<Typography variant="body2">Quantity</Typography>
				<Quantity label="" variant="outlined" />
			</Label>
			<Label>
				<Typography variant="body2">Cost (each)</Typography>
				<Coste
					label=""
					variant="outlined"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">$</InputAdornment>
						),
					}}
				/>
			</Label>
			<Label>
				<Typography variant="body2">Cost (total)</Typography>
				<Costt
					label=""
					variant="outlined"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">$</InputAdornment>
						),
					}}
				/>
			</Label>
			<ButtonCont>
				<ClearIcon />
			</ButtonCont>
		</Cont>
	);
};

const SuppliesandMaterials = () => {
	const Container = styled.div({
		display: "flex",
		flexDirection: "column",
		gap: 10,
	});

	return (
		<Container>
			<Typography>
				<b>Supplies and Materials</b>
			</Typography>
			<SuppliesandMaterialsComponent />
			<SuppliesandMaterialsComponent />
			<SuppliesandMaterialsComponent />
		</Container>
	);
};

const Bartering = () => {
	const CustomRadio = styled(FormControlLabel)({
		height: 30,
		marginLeft: 5,
	});
	return (
		<FormControl>
			<Typography variant="body2">Are you open to bartering?</Typography>
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
	);
};

const Participation = () => {
	return (
		<>
			<Typography>
				<b>Participation</b>
			</Typography>
			<FormControl>
				<InputLabel>Cost to participate</InputLabel>
				<Select id="outlined" label="cost to participate">
					<MenuItem value={0}>No Cost</MenuItem>
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel>Maximum number of participants</InputLabel>
				<Select id="outlined" label="maximum number of participants">
					<MenuItem value={10}>10</MenuItem>
				</Select>
			</FormControl>
			<FormControlLabel control={<Checkbox />} label="No Limit" />
		</>
	);
};

const Crowdfunding = () => {
	const CustomRadio = styled(FormControlLabel)({
		height: 30,
		marginLeft: 5,
	});
	return (
		<>
			<Typography>
				<b>Crowdfunding</b>
			</Typography>
			<FormControl>
				<Typography variant="body2">
					Are you open to bartering?
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
			<FormControl>
				<InputLabel>Deadline for funding</InputLabel>
				<Select
					startAdornment={
						<InputAdornment position="start">
							<EventIcon />
						</InputAdornment>
					}
					id="outlined"
					label="Deadline for funding"
				>
					<MenuItem value={"Date"}>Date</MenuItem>
				</Select>
			</FormControl>
			<TextField
				label="Crowdfund Amount"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">$</InputAdornment>
					),
				}}
			/>
			<TextField
				label="Message"
				placeholder="Add a thank you message to backers."
				multiline
				rows={7}
				fullWidth
			/>
		</>
	);
};
function Budgeting() {
	return (
		<>
			<Page>
				<Form>
					<Header text="Budgeting" />
					<SuppliesandMaterials />
					<Bartering />
					<Participation />
					<Crowdfunding />
				</Form>
			</Page>
		</>
	);
}

export default Budgeting;
