import styled from "@emotion/styled";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddContainer from "./AddContainer";
interface Row {
	itemName: string;
	quantity: number;
	costEach: number;
	costTotal: number;
}

const RowTextField = styled(TextField)({
	border: "1px solid black",
	borderRadius: 8,
});

const BudgetGrid = styled(Grid)({
	marginBottom: 16,
});

const DeleteButton = styled(IconButton)({
	margin: "auto",
	marginLeft: 21,
});

const DeleteIcon = styled(CloseIcon)({
	color: "#666666",
});

const RowContainer = styled("div")({
	display: "flex",
	width: "110%",
});

const TotalCostContainer = styled(Grid)({
	display: "flex",
	alignItems: "center",
});

const TotalBudgetLabel = styled(Typography)({
	width: "50%",
	marginRight: 20,
});

const BudgetingGrid = () => {
	const [rows, setRows] = useState<Row[]>([
		{ itemName: "", quantity: 0, costEach: 0, costTotal: 0 },
		{ itemName: "", quantity: 0, costEach: 0, costTotal: 0 },
		{ itemName: "", quantity: 0, costEach: 0, costTotal: 0 },
	]);

	const handleAddRow = () => {
		setRows([
			...rows,
			{ itemName: "", quantity: 0, costEach: 0, costTotal: 0 },
		]);
	};

	const handleDeleteRow = (index: any) => {
		if (rows.length === 1) return;
		const newItems = [...rows];
		newItems.splice(index, 1);
		setRows(newItems);
	};

	// const handleInputChange = (index: number, event: any) => {
	// 	const { name, value } = event.target;
	// 	const updatedRows = [...rows];
	// 	updatedRows[index] = { ...updatedRows[index], [name]: value };
	// 	setRows(updatedRows);
	// };
	const handleInputChange = (index: number, event: any) => {
		setRows((prevRows) => {
			const updatedRows = [...prevRows];
			updatedRows[index] = {
				...updatedRows[index],
				[event.target.name]: event.target.value,
			};
			return updatedRows;
		});
	};

	const [budgetTotal, setBudgetTotal] = useState<number>(0);

	const sumTotal = (index: number) => {
		let sum = 0;
		rows.forEach((row) => {
			row.costTotal = row.costEach * row.quantity;
			sum += row.costTotal;
			console.log(row.costTotal);
		});
		setBudgetTotal(sum);
	};

	return (
		<div>
			<BudgetGrid container spacing={2}>
				<Grid item xs={6}>
					<Typography>Item name</Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography>Quantity</Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography>Cost (each)</Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography>Cost (total)</Typography>
				</Grid>
			</BudgetGrid>
			{rows.map((row, index) => (
				<RowContainer key={index}>
					<BudgetGrid container spacing={2}>
						<Grid item xs={6}>
							<RowTextField
								required
								name="itemName"
								value={row.itemName}
								onChange={(event) => {
									handleInputChange(index, event);
									sumTotal(index);
								}}
								fullWidth
							/>
						</Grid>
						<Grid item xs={2}>
							<RowTextField
								type="number"
								required
								name="quantity"
								value={row.quantity}
								onChange={(event) => {
									handleInputChange(index, event);
									sumTotal(index);
								}}
								InputProps={{ inputProps: { min: 0 } }}
								fullWidth
							/>
						</Grid>
						<Grid item xs={2}>
							<RowTextField
								required
								type="number"
								name="costEach"
								value={row.costEach}
								onChange={(event) => {
									handleInputChange(index, event);
									sumTotal(index);
								}}
								InputProps={{
									startAdornment: <>$</>,
									inputProps: { min: 0 },
								}}
								fullWidth
							/>
						</Grid>
						<Grid item xs={2}>
							<RowTextField
								disabled
								required
								type="number"
								name="costTotal"
								value={row.costTotal}
								InputProps={{
									startAdornment: <>$</>,
									inputProps: { min: 0 },
								}}
								fullWidth
							/>
						</Grid>
					</BudgetGrid>
					<DeleteButton onClick={() => handleDeleteRow(index)}>
						<DeleteIcon />
					</DeleteButton>
				</RowContainer>
			))}
			<Grid container spacing={2}>
				<Grid item xs={7}>
					<AddContainer
						label="Add another item"
						onClick={handleAddRow}
					/>
				</Grid>
				<TotalCostContainer item xs={5}>
					<TotalBudgetLabel>Total cost</TotalBudgetLabel>
					<RowTextField
						disabled
						type="number"
						name="total"
						value={budgetTotal}
						InputProps={{
							startAdornment: <>$</>,
						}}
						sx={{ textAlign: "right" }}
						fullWidth
					/>
				</TotalCostContainer>
			</Grid>
		</div>
	);
};

export default BudgetingGrid;
