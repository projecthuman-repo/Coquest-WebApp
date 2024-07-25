import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";

type AddEducationDialogueProps = {
	open: boolean;
	onClose: () => void;
	onSave: (name: string, age: number) => void;
};

const _EducationDialogue = ({
	open,
	onClose,
	onSave,
}: AddEducationDialogueProps) => {
	const [name, setName] = useState("");
	const [age, setAge] = useState<number | undefined>(undefined);

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAge(parseInt(event.target.value, 10));
	};

	const handleSave = () => {
		onSave(name, age!);
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Add Person</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					label="Name"
					type="text"
					fullWidth
					value={name}
					onChange={handleNameChange}
				/>
				<TextField
					margin="dense"
					label="Age"
					type="number"
					fullWidth
					value={age === undefined ? "" : age}
					onChange={handleAgeChange}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleSave} disabled={!name || !age}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};
