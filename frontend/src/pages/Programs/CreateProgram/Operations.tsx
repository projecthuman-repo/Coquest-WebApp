import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { RadioGroupField } from "../components/RadioGroupField";
import AddContainer from "../components/AddContainer";
import BasicDateRangePicker from "../components/DateTime/DateRange";
import BasicTimeRangePicker from "../components/DateTime/TimeRange";
import LocationSearch from "../components/Location/LocationSearch";
import SkillsCertsSearch from "../components/Search/SkillsCertsSearch";
import { useProgram } from "./ProgramContext";
import { VolunteerPosition, Location } from "../../../models/programModel";
import "./CreateProgram.css";

const Operations: React.FC = () => {
	const { program, updateProgram, stepsCompleted, updateStepsCompleted } =
		useProgram();
	const highlightUnfilled = stepsCompleted["operations"].highlightUnfilled;

	// date and time
	const [startDate, setStartDate] = useState<Date | null>(
		program.startDate ? new Date(program.startDate) : null,
	);

	const [endDate, setEndDate] = useState<Date | null>(
		program.endDate ? new Date(program.endDate) : null,
	);
	const [startTime, setStartTime] = useState<string>(program.startTime || "");
	const [endTime, setEndTime] = useState<string>(program.endTime || "");
	const [recurringChoice, setRecurringChoice] = useState<string>(
		program.recurring || "",
	);

	// location and program space
	const [location, setLocation] = useState<Location | null>(
		program.location || {
			name: "",
			lat: 0,
			lng: 0,
		},
	);
	const [haveNeutralMeetingSpace, setHaveNeutralMeetingSpace] = useState<
		boolean | undefined
	>(program.haveNeutralMeetingSpace || undefined);
	const [bookedRentalSpace, setBookedRentalSpace] = useState<
		boolean | undefined
	>(program.bookedRentalSpace || undefined);
	const [additionalInfo, setAdditionalInfo] = useState<string>(
		program.additionalInfo || "",
	);

	// volunteer opportunities
	const [allSkills, setAllSkills] = useState<string[]>([]);
	const [volunteerPositions, setVolunteerPositions] = useState<
		VolunteerPosition[]
	>(program.volunteerPositions || []);
	const [highlightedPosition, setHighlightedPosition] = useState<
		number | null
	>(null);

	// add (form for) new volunteer position
	const handleAddPosition = () => {
		// do not proceed if the last position is not filled out
		// instead, highlight the fields that need to be filled out in the last position
		const lastPosition = volunteerPositions[volunteerPositions.length - 1];
		if (lastPosition.title === "" || lastPosition.responsibilities === "") {
			setHighlightedPosition(volunteerPositions.length - 1);
			return;
		}

		setVolunteerPositions([
			...volunteerPositions,
			{
				id: undefined,
				title: "",
				responsibilities: "",
				skills: [],
			},
		]);
	};

	useEffect(() => {
		// TODO: fetch skills from backend
		const tempSkills: string[] = Array.from({ length: 100 }, (_, i) => {
			return `Skill ${i + 1}`;
		});
		setAllSkills(tempSkills);
	}, []);

	// Update program with operations information
	const updateProgramOperations = () => {
		const updatedProgram = {
			...program,
			startTime,
			endTime,
			startDate: startDate ? startDate.toISOString() : null,
			endDate: endDate ? endDate.toISOString() : null,
			recurring: recurringChoice,
			haveNeutralMeetingSpace,
			bookedRentalSpace,
			additionalInfo,
			location: location,
			volunteerPositions: volunteerPositions.filter(
				(position) =>
					position.title !== "" && position.responsibilities !== "",
			),
		};

		// criteria for passing operations step
		let canProceed =
			updatedProgram.startTime !== "" &&
			updatedProgram.endTime !== "" &&
			updatedProgram.startDate !== null &&
			updatedProgram.endDate !== null &&
			updatedProgram.recurring !== "" &&
			updatedProgram.location !== null &&
			updatedProgram.haveNeutralMeetingSpace !== undefined;
		if (updatedProgram.haveNeutralMeetingSpace === false) {
			canProceed =
				canProceed && updatedProgram.bookedRentalSpace !== undefined;
		}

		if (canProceed) {
			updateStepsCompleted("operations", true, false);
		} else {
			updateStepsCompleted("operations", false, highlightUnfilled);
		}

		updateProgram(updatedProgram);
	};

	useEffect(() => {
		if (volunteerPositions.length === 0) {
			setVolunteerPositions([
				{
					id: undefined,
					title: "",
					responsibilities: "",
					skills: [],
				},
			]);
		}

		// if startdate is the same as enddate, start time must be before end time
		if (
			startDate !== null &&
			endDate !== null &&
			startTime !== "" &&
			endTime !== "" &&
			startDate.getTime() === endDate.getTime() &&
			startTime >= endTime
		) {
			setEndTime("");
		}

		// update program whenever any field changes
		updateProgramOperations();
	}, [
		startDate,
		endDate,
		startTime,
		endTime,
		recurringChoice,
		location,
		haveNeutralMeetingSpace,
		bookedRentalSpace,
		additionalInfo,
		volunteerPositions,
	]);

	return (
		<div className="content-view">
			<h1 className="title-field">Operations</h1>

			{/* Date, time & recurring */}
			<p className="subtitle-field">
				Time and date
				<span style={{ color: "red" }}>*</span>
				{highlightUnfilled &&
					(startDate === null ||
						endDate === null ||
						startTime === "" ||
						endTime === "") && (
						<span style={{ color: "red", fontSize: "12px" }}>
							&nbsp;(fill out)
						</span>
					)}
			</p>
			<div style={{ marginBottom: 14 }}>
				<BasicDateRangePicker
					startDate={startDate}
					endDate={endDate}
					setStartDate={setStartDate}
					setEndDate={setEndDate}
				/>
				<BasicTimeRangePicker
					startTime={startTime}
					endTime={endTime}
					setStartTime={setStartTime}
					setEndTime={setEndTime}
				/>
				<div style={{ marginTop: 28 }}>
					<RadioGroupField
						label={
							<span>
								Recurring
								<span style={{ color: "red" }}>*</span>
								{highlightUnfilled &&
									recurringChoice === "" && (
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
						name="recurring-btn-group"
						value={recurringChoice || ""}
						options={[
							{ value: "daily", label: "Daily" },
							{ value: "weekly", label: "Weekly" },
							{ value: "monthly", label: "Monthly" },
						]}
						onChange={(e) => setRecurringChoice(e)}
					/>
				</div>
			</div>

			{/* Location & program space */}
			<p className="subtitle-field" style={{ marginBottom: 14 }}>
				Location
				<span style={{ color: "red" }}>*</span>
				{highlightUnfilled && location === null && (
					<span style={{ color: "red", fontSize: "12px" }}>
						&nbsp;(fill out)
					</span>
				)}
			</p>
			<div
				style={{
					marginBottom: 28,
					display: "flex",
					flexDirection: "column",
					gap: 28,
				}}
			>
				<LocationSearch
					onChange={(name, lat, lng) =>
						setLocation({ name, lat, lng })
					}
					value={location?.name || ""}
				/>

				<RadioGroupField
					label={
						<span>
							Do you own the program space?
							<span style={{ color: "red" }}>*</span>
							{highlightUnfilled &&
								haveNeutralMeetingSpace === undefined && (
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
					name="programspace-btn-group"
					value={
						haveNeutralMeetingSpace === undefined
							? ""
							: haveNeutralMeetingSpace
								? "yes"
								: "no"
					}
					options={[
						{ value: "yes", label: "Yes" },
						{ value: "no", label: "No" },
					]}
					onChange={(e) => setHaveNeutralMeetingSpace(e === "yes")}
				/>

				{haveNeutralMeetingSpace === false && (
					<RadioGroupField
						label={
							<span>
								Have you booked the rental space?
								<span style={{ color: "red" }}>*</span>
								{highlightUnfilled &&
									bookedRentalSpace === undefined && (
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
						name="rentalSpace-btn-group"
						value={
							bookedRentalSpace === undefined
								? ""
								: bookedRentalSpace
									? "yes"
									: "no"
						}
						options={[
							{ value: "yes", label: "Yes" },
							{ value: "no", label: "No" },
						]}
						onChange={(e) => setBookedRentalSpace(e === "yes")}
					/>
				)}

				<TextField
					label="Additional Information"
					placeholder="Include details about space rentals, regulations, fees, or anything else about the location"
					className="styled-textfield placeholder-mod"
					value={additionalInfo || ""}
					onChange={(e) => setAdditionalInfo(e.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
					multiline
					rows={4}
				/>
			</div>

			{/* Volunteer opportunities */}
			<p className="subtitle-field" style={{ marginBottom: 28 }}>
				Volunteer opportunities
			</p>
			<div
				style={{
					width: "100%",
					marginBottom: 28,
					display: "flex",
					flexDirection: "column",
					gap: 28,
				}}
			>
				{volunteerPositions.map((position, index) => (
					<div key={index}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: 14,
								marginTop: index !== 0 ? 28 : 0,
							}}
						>
							<p style={{ fontWeight: 500 }}>New Position</p>

							{volunteerPositions.length > 1 && (
								<img
									src="/icons/delete.png"
									alt="delete"
									style={{
										height: "15px",
										cursor: "pointer",
									}}
									onClick={() => {
										const updatedPositions =
											volunteerPositions.filter(
												(_, i) => i !== index,
											);
										setVolunteerPositions(updatedPositions);
									}}
								/>
							)}
						</div>
						<TextField
							label="Position Title"
							fullWidth
							placeholder="Provide a title for the position."
							value={position.title || ""}
							onChange={(e) => {
								const updatedPositions = [
									...volunteerPositions,
								];
								updatedPositions[index] = {
									...position,
									title: e.target.value,
								};
								setVolunteerPositions(updatedPositions);
							}}
							InputLabelProps={{ shrink: true }}
							className="styled-textfield"
							style={{
								marginBottom: 28,
							}}
							error={
								highlightedPosition === index &&
								position.title === ""
							}
						/>

						<TextField
							label="Responsibilities"
							placeholder="Provide a brief description of the position's responsibilities."
							className="styled-textfield placeholder-mod"
							value={position.responsibilities || ""}
							onChange={(e) => {
								const updatedPositions = [
									...volunteerPositions,
								];
								updatedPositions[index] = {
									...position,
									responsibilities: e.target.value,
								};
								setVolunteerPositions(updatedPositions);
							}}
							InputLabelProps={{ shrink: true }}
							multiline
							rows={4}
							style={{ marginBottom: 28, width: "100%" }}
							error={
								highlightedPosition === index &&
								position.responsibilities === ""
							}
						/>

						<div>
							<SkillsCertsSearch
								label="Search Skills and Certifications"
								skills={allSkills}
								onChange={(selectedSkills) => {
									if (
										JSON.stringify(selectedSkills) !==
										JSON.stringify(position.skills)
									) {
										const updatedPositions = [
											...volunteerPositions,
										];
										updatedPositions[index] = {
											...position,
											skills: selectedSkills,
										};
										setVolunteerPositions(updatedPositions);
									}
								}}
							/>
						</div>
					</div>
				))}
			</div>
			<AddContainer
				label="Add another position"
				onClick={handleAddPosition}
			/>
		</div>
	);
};

export default Operations;
