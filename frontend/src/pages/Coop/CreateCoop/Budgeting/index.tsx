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
import EventIcon from "@mui/icons-material/Event";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../CoopComponents/CoopTemplate/header";
import Page from "../../CoopComponents/CoopTemplate/page";
import { useOutletContext } from "react-router";
import { CreateCoopOutletContext, CreateCoopProps } from "../CreateCoop";
import { BudgetItemInput } from "@/__generated__/graphql";

const Form = styled.div({
	display: "flex",
	flexDirection: "column",
	gap: 20,
	width: 1000,
});

interface SuppliesandMaterialsProps {
	item: BudgetItemInput;
	index: number;
	updateItem: (index: number, newItem: BudgetItemInput) => void;
	removeItem: (index: number) => void;
}

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

// Define the component that renders each item
const SuppliesandMaterialsComponent = ({
	item,
	index,
	updateItem,
	removeItem,
}: SuppliesandMaterialsProps) => {
	return (
		<Cont>
			<Label>
				<Typography variant="body2">Item</Typography>
				<ItemLabel
					label={`Item ${index + 1}`}
					variant="outlined"
					value={item.name || ""}
					onChange={(e) =>
						updateItem(index, { name: e.target.value })
					}
				/>
			</Label>
			<Label>
				<Typography variant="body2">Quantity</Typography>
				<Quantity
					label=""
					variant="outlined"
					type="number"
					value={item.quantity || ""}
					onChange={(e) =>
						updateItem(index, { quantity: Number(e.target.value) })
					}
				/>
			</Label>
			<Label>
				<Typography variant="body2">Cost (each)</Typography>
				<Coste
					label=""
					variant="outlined"
					type="number"
					value={item.costEach || ""}
					onChange={(e) =>
						updateItem(index, { costEach: Number(e.target.value) })
					}
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
					value={
						item.quantity && item.costEach
							? item.quantity * item.costEach
							: ""
					}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">$</InputAdornment>
						),
					}}
					disabled
				/>
			</Label>
			<ButtonCont onClick={() => removeItem(index)}>
				<ClearIcon />
			</ButtonCont>
		</Cont>
	);
};

const Container = styled.div({
	display: "flex",
	flexDirection: "column",
	gap: 10,
});

// Define the main component that holds the list of items
const SuppliesandMaterials = ({
	updateCreateCoopData,
	createCoopData,
}: CreateCoopProps) => {
	const budgetingItems = createCoopData.budgetingItems || [{}];

	const updateItem = (index: number, newItem: BudgetItemInput) => {
		budgetingItems[index] = { ...budgetingItems[index], ...newItem };
		updateCreateCoopData({ budgetingItems });
	};

	const addItem = () => {
		budgetingItems.push({});
		console.log(budgetingItems);
		updateCreateCoopData({ budgetingItems });
	};

	const removeItem = (index: number) => {
		budgetingItems.splice(index, 1);
		updateCreateCoopData({ budgetingItems });
	};

	return (
		<Container>
			<Typography>
				<b>Supplies and Materials</b>
			</Typography>
			{budgetingItems.map((item, index) => (
				<SuppliesandMaterialsComponent
					key={index}
					item={item}
					index={index}
					updateItem={updateItem}
					removeItem={removeItem}
				/>
			))}
			<IconButton onClick={addItem}>
				<AddIcon />
			</IconButton>
		</Container>
	);
};

const CustomRadio = styled(FormControlLabel)({
	height: 30,
	marginLeft: 5,
});

const Bartering = ({
	updateCreateCoopData,
	createCoopData,
}: CreateCoopProps) => {
	return (
		<FormControl>
			<Typography variant="body2">Are you open to bartering?</Typography>
			<RadioGroup
				value={String(createCoopData.openToBartering)}
				onChange={(e) =>
					// converting to boolean
					updateCreateCoopData({
						openToBartering: e.target.value === "true",
					})
				}
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
	);
};

const Participation = ({
	updateCreateCoopData,
	createCoopData,
}: CreateCoopProps) => {
	return (
		<>
			<Typography>
				<b>Participation</b>
			</Typography>
			<FormControl>
				<InputLabel>Cost to participate</InputLabel>
				<Select
					id="outlined"
					label="cost to participate"
					value={createCoopData.participationCost ?? ""}
					onChange={(e) =>
						updateCreateCoopData({
							participationCost: Number(e.target.value),
						})
					}
				>
					<MenuItem value={0}>No Cost</MenuItem>
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel>Maximum number of participants</InputLabel>
				<Select
					id="outlined"
					label="maximum number of participants"
					value={createCoopData.maxParticipants ?? ""}
					onChange={(e) =>
						updateCreateCoopData({
							maxParticipants: Number(e.target.value),
						})
					}
				>
					<MenuItem value={10}>10</MenuItem>
				</Select>
			</FormControl>
			<FormControlLabel control={<Checkbox />} label="No Limit" />
		</>
	);
};

const Crowdfunding = ({
	updateCreateCoopData,
	createCoopData,
}: CreateCoopProps) => {
	return (
		<>
			<Typography>
				<b>Crowdfunding</b>
			</Typography>
			<FormControl>
				<Typography variant="body2">
					Are you open to bartering?
				</Typography>
				<RadioGroup
					value={String(createCoopData.openToBartering)}
					onChange={(e) =>
						updateCreateCoopData({
							// converting to boolean
							openToBartering: e.target.value === "true",
						})
					}
				>
					<CustomRadio
						value={true}
						control={<Radio size="small" color="default" />}
						label={<Typography variant="body2">Yes</Typography>}
					/>
					<CustomRadio
						value={false}
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
					value={createCoopData.endDate ?? ""}
					onChange={(e) =>
						updateCreateCoopData({ endDate: e.target.value })
					}
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
				type="number"
				value={
					createCoopData.crowdfundingAmount
						? createCoopData.crowdfundingAmount
						: ""
				}
				onChange={(e) =>
					updateCreateCoopData({
						crowdfundingAmount: Number(e.target.value),
					})
				}
			/>
			<TextField
				label="Message"
				placeholder="Add a thank you message to backers."
				multiline
				rows={7}
				fullWidth
				value={createCoopData.crowdfundingMessage ?? ""}
				onChange={(e) =>
					updateCreateCoopData({
						crowdfundingMessage: e.target.value,
					})
				}
			/>
		</>
	);
};
function Budgeting() {
	const { updateCreateCoopData, createCoopData } =
		useOutletContext<CreateCoopOutletContext>();

	return (
		<>
			<Page>
				<Form>
					<Header text="Budgeting" />
					<SuppliesandMaterials
						updateCreateCoopData={updateCreateCoopData}
						createCoopData={createCoopData}
					/>
					<Bartering
						updateCreateCoopData={updateCreateCoopData}
						createCoopData={createCoopData}
					/>
					<Participation
						updateCreateCoopData={updateCreateCoopData}
						createCoopData={createCoopData}
					/>
					<Crowdfunding
						updateCreateCoopData={updateCreateCoopData}
						createCoopData={createCoopData}
					/>
				</Form>
			</Page>
		</>
	);
}

export default Budgeting;
