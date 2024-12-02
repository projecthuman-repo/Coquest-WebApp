import styled from "@emotion/styled";
import { IconButton, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddContainer from "../components/AddContainer";
import CloseIcon from "@mui/icons-material/Close";
import { BudgetItem } from "@/models/programModel";

const GridContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const HeaderRow = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	margin-bottom: 10px;
	flex-wrap: wrap;

	@media (max-width: 900px) {
		display: none;
	}
`;

const RowContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	flex-wrap: wrap;

	@media (max-width: 900px) {
		border: 1px solid #d0d0d0;
		border-radius: 4px;
		margin-bottom: 20px;
		padding: 10px;
	}

	@media (max-width: 900px) and (min-width: 501px) {
		& > *:nth-of-type(1) {
			width: 100%;
			margin-bottom: 10px;
		}
		& > *:nth-of-type(2),
		& > *:nth-of-type(3) {
		& > *:nth-of-type(4) {
			width: 33.33%;
		}
	}

	@media (max-width: 500px) {
		& > * {
			width: 100%;
			margin-bottom: 10px;
		}
		& > *:last-child {
			margin-bottom: 0;
		}
	}
`;

const Column = styled.div`
	padding: 5px;
	width: 100%;

	@media (min-width: 901px) {
		&.item-name {
			width: 40%;
		}
		&.quantity,
		&.cost-each,
		&.cost-total {
			width: 18%;
		}
		&.delete-button {
			width: 6%;
		}
	}
`;

const StyledTextField = styled(TextField)`
	width: 100%;

	&.highlighted {
		border: 1px solid red;
		border-radius: 4px;
	}
`;

const DeleteButton = styled(IconButton)`
	padding: 0;
	height: 40px;
	width: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const BottomContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-top: 20px;
	flex-wrap: wrap;

	@media (max-width: 900px) {
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
	}
`;

const AddContainerWrapper = styled.div`
	flex-grow: 1;
	margin-right: 20px;
	margin-bottom: 10px;
`;

const TotalCostContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;

	@media (max-width: 900px) {
		width: 100%;
		flex: 1;
	}
`;

const TotalCostLabel = styled(Typography)`
	margin-right: 10px;

	@media (max-width: 900px) {
		margin-right: 20px;
	}
`;

const TotalCostTextField = styled(TextField)`
	width: 100%;

	@media (max-width: 900px) {
		width: 100%;
		flex: 1;
	}
`;

interface BudgetGridProps {
	budgetExpenses: BudgetItem[];
	setBudgetExpenses: (expenses: BudgetItem[]) => void;
	totalBudgetExpenses: number;
	setTotalBudgetExpenses: (total: number) => void;
}

const BudgetingGrid = ({
	budgetExpenses,
	setBudgetExpenses,
	totalBudgetExpenses,
	setTotalBudgetExpenses,
}: BudgetGridProps) => {
	const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
	const [highlightedRow, setHighlightedRow] = useState<number | null>(null);

	const handleAddRow = () => {
		const lastRow = budgetExpenses[budgetExpenses.length - 1];
		if (
			lastRow.name === "" ||
			lastRow.quantity === undefined ||
			lastRow.costEach === undefined
		) {
			setHighlightedRow(budgetExpenses.length - 1);
			return;
		}
		setBudgetExpenses([
			...budgetExpenses,
			{
				name: "",
				quantity: undefined,
				costEach: undefined,
				costTotal: undefined,
			},
		]);
	};

	const handleDeleteRow = (index: number) => {
		const updatedRows = [...budgetExpenses];
		if (updatedRows[index].costTotal) {
			setTotalBudgetExpenses(
				totalBudgetExpenses - updatedRows[index].costTotal,
			);
		}
		updatedRows.splice(index, 1);
		setBudgetExpenses(updatedRows);
		setHighlightedRow(null);
	};

	const handleNameChange = (
		index: number,
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const updatedRows = [...budgetExpenses];
		updatedRows[index].name = event.target.value;
		setBudgetExpenses(updatedRows);
	};

	const handleQuantityChange = (
		index: number,
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const input = parseInt(event.target.value);
		if (input < 0) {
			return;
		}

		const updatedRows = [...budgetExpenses];
		const pastItemTotal = updatedRows[index].costTotal;
		updatedRows[index].quantity = input;
		if (updatedRows[index].costEach) {
			updatedRows[index].costTotal = input * updatedRows[index].costEach;
		}
		updateTotal(pastItemTotal, updatedRows[index].costTotal);
		setBudgetExpenses(updatedRows);
	};

	const handleCostEachChange = (
		index: number,
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const input = parseFloat(event.target.value);
		if (input < 0) {
			return;
		}

		const updatedRows = [...budgetExpenses];
		const pastItemTotal = updatedRows[index].costTotal;
		updatedRows[index].costEach = input;
		if (updatedRows[index].quantity) {
			updatedRows[index].costTotal = input * updatedRows[index].quantity;
		}
		updateTotal(pastItemTotal, updatedRows[index].costTotal);
		setBudgetExpenses(updatedRows);
	};

	const updateTotal = (
		pastItemTotal: number | undefined,
		newTotal: number | undefined,
	) => {
		let total = totalBudgetExpenses;
		if (pastItemTotal) {
			total -= pastItemTotal;
		}
		if (newTotal) {
			total += newTotal;
		}
		setTotalBudgetExpenses(total);
	};

	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<GridContainer>
			{screenWidth > 900 && (
				<HeaderRow>
					<Column className="item-name">
						<Typography>Item name</Typography>
					</Column>
					<Column className="quantity">
						<Typography>Quantity</Typography>
					</Column>
					<Column className="cost-each">
						<Typography>
							Cost{" "}
							<span style={{ fontSize: "0.8em" }}>(each)</span>
						</Typography>
					</Column>
					<Column className="cost-total">
						<Typography>
							Cost{" "}
							<span style={{ fontSize: "0.8em" }}>(total)</span>
						</Typography>
					</Column>
					<Column className="delete-button" />
				</HeaderRow>
			)}
			{budgetExpenses.map((row, index) => (
				<RowContainer key={index}>
					<Column className="item-name">
						{screenWidth <= 900 && (
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Typography variant="caption">
									Item name
								</Typography>
								<DeleteButton
									onClick={() => handleDeleteRow(index)}
								>
									<CloseIcon />
								</DeleteButton>
							</div>
						)}
						<StyledTextField
							name="name"
							value={row.name || ""}
							className={
								highlightedRow === index && row.name === ""
									? "highlighted"
									: ""
							}
							onChange={(event) => {
								handleNameChange(index, event);
							}}
						/>
					</Column>
					<Column className="quantity">
						{screenWidth <= 900 && (
							<Typography variant="caption">Quantity</Typography>
						)}
						<StyledTextField
							type="number"
							name="quantity"
							value={row.quantity || ""}
							className={
								highlightedRow === index &&
								row.quantity === undefined
									? "highlighted"
									: ""
							}
							onChange={(event) => {
								handleQuantityChange(index, event);
							}}
							InputProps={{ inputProps: { min: 0 } }}
						/>
					</Column>
					<Column className="cost-each">
						{screenWidth <= 900 && (
							<Typography variant="caption">
								Cost (each)
							</Typography>
						)}
						<StyledTextField
							type="number"
							name="costEach"
							value={row.costEach || ""}
							className={
								highlightedRow === index &&
								row.costEach === undefined
									? "highlighted"
									: ""
							}
							onChange={(event) => {
								handleCostEachChange(index, event);
							}}
							InputProps={{
								startAdornment: <>$</>,
								inputProps: { min: 0 },
							}}
						/>
					</Column>

					<Column className="cost-total">
						{screenWidth <= 900 && (
							<Typography variant="caption">
								Cost (total)
							</Typography>
						)}
						<Tooltip title={row.costTotal || 0}>
							<StyledTextField
								disabled
								type="number"
								name="costTotal"
								value={row.costTotal || 0}
								InputProps={{
									startAdornment: <>$</>,
									inputProps: { min: 0 },
								}}
							/>
						</Tooltip>
					</Column>

					{screenWidth > 900 && (
						<Column className="delete-button">
							<DeleteButton
								onClick={() => handleDeleteRow(index)}
							>
								<CloseIcon
									style={{ color: "rgba(0, 0, 0, 0.54)" }}
								/>
							</DeleteButton>
						</Column>
					)}
				</RowContainer>
			))}

			<BottomContainer>
				<AddContainerWrapper>
					<AddContainer
						label="Add another item"
						onClick={handleAddRow}
					/>
				</AddContainerWrapper>
				<TotalCostContainer>
					<TotalCostLabel>Total cost</TotalCostLabel>
					<TotalCostTextField
						disabled
						type="number"
						name="total"
						value={totalBudgetExpenses}
						InputProps={{
							startAdornment: <>$</>,
						}}
					/>
				</TotalCostContainer>
				{screenWidth > 900 && (
					<Column
						className="delete-button"
						style={{ width: "calc(6% + 4px)" }}
					/>
				)}
			</BottomContainer>
		</GridContainer>
	);
};

export default BudgetingGrid;
