import React from "react";

import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
	Skeleton,
	TextField,
	Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Form from "../../CoopComponents/CoopTemplate/form";
import Header from "../../CoopComponents/CoopTemplate/header";
import Page from "../../CoopComponents/CoopTemplate/page";
import Sharelink from "../../CoopComponents/Sharelink";
import { useOutletContext } from "react-router";
import { CreateCoopOutletContext, CreateCoopProps } from "../CreateCoop";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

const Map = () => {
	const MapContainer = styled.div({
		display: "flex",
		justifyContent: "center",
	});

	return (
		<>
			<Typography variant="body2">
				Set the promotion area of the project
			</Typography>
			<MapContainer>
				<Skeleton variant="rectangular" width={"80%"} height={500}>
					Map is Loading...
				</Skeleton>
			</MapContainer>
		</>
	);
};
const Container = styled(FormGroup)({
	gap: 20,
});
const Partnership = ({
	updateCreateCoopData,
	createCoopData,
}: CreateCoopProps) => {
	return (
		<Container>
			<FormControlLabel
				control={
					<Checkbox
						icon={<RadioButtonUncheckedIcon />}
						checkedIcon={<RadioButtonCheckedIcon />}
						size="small"
						color="default"
						checked={!!createCoopData.materialHelp}
					/>
				}
				label="Material"
			/>
			<TextField
				label="Materials and equipment"
				placeholder="What kind of help do you need?"
				fullWidth
				value={createCoopData.materialHelp}
				onChange={(e) =>
					updateCreateCoopData({ materialHelp: e.target.value })
				}
			/>
			<FormControlLabel
				control={
					<Checkbox
						icon={<RadioButtonUncheckedIcon />}
						checkedIcon={<RadioButtonCheckedIcon />}
						size="small"
						color="default"
						checked={!!createCoopData.serviceHelp}
					/>
				}
				label="Services"
			/>
			<TextField
				label="Services"
				placeholder="What kind of help do you need?"
				fullWidth
				value={createCoopData.serviceHelp}
				onChange={(e) =>
					updateCreateCoopData({ serviceHelp: e.target.value })
				}
			/>
			<FormControlLabel
				control={
					<Checkbox
						icon={<RadioButtonUncheckedIcon />}
						checkedIcon={<RadioButtonCheckedIcon />}
						size="small"
						color="default"
						checked={!!createCoopData.operationHelp}
					/>
				}
				label="Operations"
			/>
			<TextField
				label="Operations"
				placeholder="What kind of help do you need?"
				fullWidth
				value={createCoopData.operationHelp}
				onChange={(e) =>
					updateCreateCoopData({ operationHelp: e.target.value })
				}
			/>
		</Container>
	);
};

const InviteAndShare = () => {
	return (
		<>
			<Typography>
				<b>Invite and Share</b>
			</Typography>
			<Sharelink />
			<FormControl>
				<InputLabel>Invite people</InputLabel>
				<Select id="outlined" label="invite people" defaultValue={""}>
					<MenuItem value={"input"}>Input</MenuItem>
				</Select>
			</FormControl>
		</>
	);
};

function CoopPromotion() {
	const { createCoopData, updateCreateCoopData, handleSubmit } =
		useOutletContext<CreateCoopOutletContext>();

	return (
		<>
			<Page>
				<Form>
					<Header text="Promotion" />
					<Map />
					<Partnership
						createCoopData={createCoopData}
						updateCreateCoopData={updateCreateCoopData}
					/>
					<InviteAndShare />
					<PrimaryButton onClick={handleSubmit} name="Submit"></PrimaryButton>
				</Form>
			</Page>
		</>
	);
}

export default CoopPromotion;
