import React, { useState, useEffect } from "react";
import { Checkbox } from "@mui/material";
import BudgetingGrid from "../components/BudgetingGrid";
import { RadioGroupField } from "../components/RadioGroupField";
import DateComponent from "../components/DateTime/DateComponent";
import TextField from "@mui/material/TextField";
import { useProgram } from "./ProgramContext";
import "./CreateProgram.css";

const Budgeting: React.FC = () => {
	const { program, updateProgram, stepsCompleted, updateStepsCompleted } =
		useProgram();
	const highlightUnfilled = stepsCompleted["budgeting"].highlightUnfilled;

	// budgeting details
	const [expanded, setExpanded] = useState<boolean>(true);
	const [budgetingItems, setBudgetingItems] = useState(
		program.budgetingItems ?? [],
	);
	const [totalBudgetExpenses, setTotalBudgetExpenses] = useState(
		program.totalBudgetExpenses ?? 0,
	);
	const [openToBartering, setOpenToBartering] = useState<boolean | undefined>(
		program.openToBartering ?? undefined,
	);

	// participation
	const [cost, setCost] = useState<number | null>(program.cost ?? null);
	const [spots, setSpots] = useState<number | null>(program.spots ?? null);
	const [noLimit, setNoLimit] = useState<boolean>(program.spots === null);

	// crowdfunding
	const [crowdfundingNeeded, setCrowdfundingNeeded] = useState<
		boolean | undefined
	>(program.needsCrowdfunding ?? undefined);
	const [crowdfundAmount, setCrowdfundAmount] = useState<number | null>(
		program.crowdfundingAmount ?? null,
	);
	const [crowdfundDateOfFunding, setCrowdfundDateOfFunding] =
		useState<Date | null>(
			program.crowdfundingDate
				? new Date(program.crowdfundingDate)
				: null,
		);
	const [crowdfundThankyouMessage, setCrowdfundThankyouMessage] =
		useState<string>(program.crowdfundingMessage ?? "");

	// handlers
	const handleExpand = () => {
		setExpanded(!expanded);
	};

	const handleSetCost = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (parseFloat(value) < 0) return;
		setCost(value === "" ? 0 : parseFloat(value));
	};

	const handleSetSpots = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (parseInt(value) < 0) return;
		setSpots(value === "" ? null : parseInt(value));
	};

	// update program with budgeting details
	const updateProgramBudgeting = () => {
		const updatedProgram = {
			...program,
			budgetingItems: budgetingItems.filter(
				(item) => item.name !== "" && item.costTotal !== undefined,
			),
			totalBudgetExpenses,
			openToBartering,
			cost,
			spots: noLimit ? null : spots,
			crowdfundingNeeded,
			crowdfundingAmount: crowdfundAmount,
			crowdfundingDate: crowdfundDateOfFunding
				? crowdfundDateOfFunding.toISOString()
				: null,
			crowdfundingMessage: crowdfundThankyouMessage,
		};

		updateProgram(updatedProgram);

		// criteria for passing budgeting step
		let canProceed =
			updatedProgram.budgetingItems.length > 0 &&
			updatedProgram.openToBartering !== undefined &&
			updatedProgram.cost !== null &&
			updatedProgram.crowdfundingNeeded !== undefined;
		if (crowdfundingNeeded) {
			canProceed =
				canProceed &&
				updatedProgram.crowdfundingAmount !== null &&
				updatedProgram.crowdfundingDate !== null;
		}

		if (canProceed) {
			updateStepsCompleted("budgeting", true, false);
		} else {
			updateStepsCompleted("budgeting", false, highlightUnfilled);
		}
	};

	// update noLimit when spots is null
	useEffect(() => {
		if (spots === null) setNoLimit(true);
		else setNoLimit(false);
	}, [spots]);

	// reset spots when noLimit is checked
	useEffect(() => {
		if (noLimit) setSpots(null);
	}, [noLimit]);

	useEffect(() => {
		if (budgetingItems.length === 0) {
			setBudgetingItems([
				{
					name: "",
					quantity: undefined,
					costEach: undefined,
					costTotal: undefined,
				},
			]);
		}

		// Update program whenever any field changes
		updateProgramBudgeting();
	}, [
		budgetingItems,
		totalBudgetExpenses,
		openToBartering,
		cost,
		spots,
		noLimit,
		crowdfundingNeeded,
		crowdfundAmount,
		crowdfundDateOfFunding,
		crowdfundThankyouMessage,
	]);

	return (
		<div className="content-view">
			<h1 className="title-field">Budgeting</h1>

			{/* Budgeting - Supplies, Materials, Bartering */}
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 14,
				}}
			>
				<p className="subtitle-field" style={{ marginBottom: 14 }}>
					Supplies and Materials
					<span style={{ color: "red" }}>*</span>
					{highlightUnfilled && budgetingItems.length === 1 && (
						<span style={{ color: "red", fontSize: "12px" }}>
							&nbsp;(fill out)
						</span>
					)}
				</p>
				{expanded ? (
					<p className="collapse-btn" onClick={handleExpand}>
						Collapse
					</p>
				) : (
					<p className="collapse-btn" onClick={handleExpand}>
						Expand
					</p>
				)}
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
				{expanded && (
					<BudgetingGrid
						budgetExpenses={budgetingItems}
						setBudgetExpenses={setBudgetingItems}
						totalBudgetExpenses={totalBudgetExpenses}
						setTotalBudgetExpenses={setTotalBudgetExpenses}
					/>
				)}
				<RadioGroupField
					label={
						<span>
							Are you open to bartering
							<span style={{ color: "red" }}>*</span>
							{highlightUnfilled &&
								openToBartering === undefined && (
									<span
										style={{
											color: "red",
											fontSize: "12px",
										}}
									>
										&nbsp;(fill out)
									</span>
								)}
						</span>
					}
					name="bartering-btn-group"
					value={
						openToBartering === undefined
							? ""
							: openToBartering
								? "yes"
								: "no"
					}
					options={[
						{ value: "yes", label: "Yes" },
						{ value: "no", label: "No" },
					]}
					onChange={(e) => setOpenToBartering(e === "yes")}
				/>
			</div>

			{/* Participation - Cost, Spots */}
			<p
				className="subtitle-field"
				style={{ marginTop: 28, marginBottom: 28 }}
			>
				Participation
			</p>
			<div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
				<TextField
					label={
						<span>
							Cost to participate
							<span style={{ color: "red" }}>*</span>
							{highlightUnfilled && cost === null && (
								<span style={{ color: "red" }}>
									&nbsp;(fill out)
								</span>
							)}
						</span>
					}
					placeholder=" No cost"
					className="styled-textfield placeholder-mod"
					value={cost || ""}
					onChange={handleSetCost}
					type="number"
					InputLabelProps={{ shrink: true }}
					InputProps={{
						startAdornment: <>$</>,
						inputProps: { min: 0 },
					}}
				/>
				<TextField
					label={<span>Maximum number of participants</span>}
					placeholder=""
					className="styled-textfield"
					type="number"
					value={spots ?? ""}
					onChange={handleSetSpots}
					InputLabelProps={{ shrink: true }}
				/>
				<div className="checkbox-container">
					<Checkbox
						checked={noLimit === undefined ? false : noLimit}
						onChange={(e) => setNoLimit(e.target.checked)}
						color="default"
					/>
					<p style={{ marginLeft: 8 }}>No Limit</p>
				</div>
			</div>

			{/* Crowdfunding - Date, Amount, Thank you message */}
			<p
				className="subtitle-field"
				style={{ marginTop: 28, marginBottom: 14 }}
			>
				Crowdfunding
				<span style={{ color: "red" }}>*</span>
				{highlightUnfilled && crowdfundingNeeded === undefined && (
					<span style={{ color: "red", fontSize: "12px" }}>
						&nbsp;(fill out)
					</span>
				)}
			</p>
			<div>
				<RadioGroupField
					label="Do you need to crowdfund the program?"
					name="crowdfunding-btn-group"
					value={
						crowdfundingNeeded === undefined
							? ""
							: crowdfundingNeeded
								? "yes"
								: "no"
					}
					options={[
						{ value: "yes", label: "Yes" },
						{ value: "no", label: "No" },
					]}
					onChange={(e) => setCrowdfundingNeeded(e === "yes")}
				/>
				{/* Subform that appears when "yes" is checked on crowdfunding */}
				{crowdfundingNeeded && (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: 28,
						}}
					>
						<DateComponent
							label={
								<span>
									Date of Funding
									<span style={{ color: "red" }}>*</span>
									{highlightUnfilled &&
										crowdfundDateOfFunding === null && (
											<span style={{ color: "red" }}>
												&nbsp;(fill out)
											</span>
										)}
								</span>
							}
							value={crowdfundDateOfFunding ?? new Date()}
							onChange={setCrowdfundDateOfFunding}
						/>
						<TextField
							label={
								<span>
									Crowdfund amount
									<span style={{ color: "red" }}>*</span>
									{highlightUnfilled &&
										crowdfundAmount === null && (
											<span style={{ color: "red" }}>
												&nbsp;(fill out)
											</span>
										)}
								</span>
							}
							placeholder=""
							className="styled-textfield"
							value={crowdfundAmount ?? ""}
							onChange={(e) =>
								setCrowdfundAmount(
									e.target.value === ""
										? null
										: parseFloat(e.target.value),
								)
							}
							InputLabelProps={{ shrink: true }}
							type="number"
							InputProps={{
								startAdornment: <>$</>,
								inputProps: { min: 0 },
							}}
						/>
						<TextField
							label="Thank you message"
							placeholder="Add a thank you message to backers."
							className="styled-textfield"
							value={crowdfundThankyouMessage ?? ""}
							onChange={(e) =>
								setCrowdfundThankyouMessage(e.target.value)
							}
							InputLabelProps={{ shrink: true }}
							multiline
							rows={4}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Budgeting;
