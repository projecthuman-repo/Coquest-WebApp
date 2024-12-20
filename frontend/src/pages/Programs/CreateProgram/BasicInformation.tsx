import React, { useState, useEffect } from "react";
import { FormControl, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { RadioGroupField } from "../components/RadioGroupField";
import HashtagSearch from "../components/Search/HashtagSearch";
import AddContainer from "../components/AddContainer";
import { useProgram } from "./ProgramContext";
import "./CreateProgram.css";

const BasicInformation = () => {
	const { program, updateProgram, stepsCompleted, updateStepsCompleted } =
		useProgram();
	const highlightUnfilled =
		stepsCompleted["basic-information"].highlightUnfilled;

	const [programName, setProgramName] = useState<string>(program.name || "");
	const [categories, setCategories] = useState<string[]>([]); // categories in the system
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		program.category || null,
	);
	const [summary, setSummary] = useState<string>(program.summary || "");
	const [mission, setMission] = useState<string>(program.mission || "");
	const [allHashtags, setAllHashtags] = useState<string[]>([]); // hashtags in the system
	const [selectedHashtags, setSelectedHashtags] = useState<string[] | null>(
		program.hashtags || null,
	);
	const [isCharity, setIsCharity] = useState<boolean | undefined>(
		program.isCharity || undefined,
	);
	const [type, setType] = useState<string>(program.type || "");
	const [isPublic, setIsPublic] = useState<boolean | undefined>(
		program.isPublic || undefined,
	);
	const [experience, setExperience] = useState(program.experienceInPlanning);

	useEffect(() => {
		// TODO: fetch categories from backend
		const tempCategories: string[] = [
			"Option 1",
			"Option 2",
			"Option 3",
			"Option 4",
		];
		setCategories(tempCategories);

		// TODO: fetch hashtags from backend
		const tempHtags: string[] = Array.from({ length: 100 }, (_, i) => {
			return `Hashtag ${i + 1}`;
		});
		setAllHashtags(tempHtags);
	}, []);

	// Update program with basic information
	const updateProgramBasicInfo = () => {
		const updatedProgram = {
			...program,
			name: programName,
			category: selectedCategory,
			summary: summary,
			mission: mission,
			type: type,
			isPublic: isPublic,
			isCharity: isCharity,
			hashtags: selectedHashtags,
			userID: undefined, // TODO: fetch user id from backend
			experienceInPlanning: experience || undefined,
		};

		// criteria for passing basic information step
		const canProceed =
			updatedProgram.name !== "" &&
			updatedProgram.summary !== "" &&
			updatedProgram.mission !== "" &&
			updatedProgram.isCharity !== undefined &&
			updatedProgram.type !== "" &&
			updatedProgram.isPublic !== undefined;

		if (canProceed) {
			updateStepsCompleted("basic-information", true, false);
		} else {
			updateStepsCompleted("basic-information", false, highlightUnfilled);
		}

		updateProgram(updatedProgram);
	};

	// Update program whenever any field changes
	useEffect(() => {
		updateProgramBasicInfo();
	}, [
		programName,
		selectedCategory,
		summary,
		mission,
		selectedHashtags,
		isCharity,
		type,
		isPublic,
		experience,
	]);

	return (
		<div className="content-view">
			<h1 className="title-field">Basic Information</h1>

			<FormControl variant="outlined" fullWidth>
				{/* Program Name */}
				<TextField
					style={{
						marginBottom: 28,
					}}
					label={
						<span>
							Program name
							<span style={{ color: "red" }}>*</span>
							{highlightUnfilled && programName === "" && (
								<span style={{ color: "red" }}>
									&nbsp;(fill out)
								</span>
							)}
						</span>
					}
					fullWidth
					placeholder="Name your program"
					value={programName || ""}
					onChange={(e) => setProgramName(e.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
					className="styled-textfield"
				/>

				{/* Program Category */}
				<TextField
					style={{ marginBottom: 28 }}
					select
					label="Program Type"
					value={selectedCategory ?? "default"}
					onChange={(e) => {
						const category = categories.find(
							(c) => c === e.target.value,
						);
						setSelectedCategory(category || null);
					}}
					InputLabelProps={{
						style: { color: "black" },
					}}
					className="styled-textfield"
					sx={{
						"& .MuiInputBase-root": {
							color: selectedCategory ? "black" : "#a1a1a1",
						},
					}}
				>
					<MenuItem disabled value="default">
						Select a category
					</MenuItem>
					{categories.map((category, index) => (
						<MenuItem key={index} value={category}>
							{category}
						</MenuItem>
					))}
				</TextField>

				{/* Program summary */}
				<TextField
					style={{
						marginBottom: 28,
					}}
					label={
						<span>
							Program description
							<span style={{ color: "red" }}>*</span>
							{highlightUnfilled && summary === "" && (
								<span style={{ color: "red" }}>
									&nbsp;(fill out)
								</span>
							)}
						</span>
					}
					placeholder="Create a description for your program"
					className="placeholder-mod styled-textfield"
					value={summary || ""}
					onChange={(e) => setSummary(e.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
					multiline
					rows={4}
				/>

				{/* Program mission */}
				<TextField
					style={{
						marginBottom: 28,
					}}
					label={
						<span>
							Program Objective
							<span style={{ color: "red" }}>*</span>
							{highlightUnfilled && mission === "" && (
								<span style={{ color: "red" }}>
									&nbsp;(fill out)
								</span>
							)}
						</span>
					}
					placeholder="State the goal for your program"
					className="placeholder-mod styled-textfield"
					value={mission || ""}
					onChange={(e) => setMission(e.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
					multiline
					rows={4}
				/>

				{/* Hashtags Searchbar */}
				<div style={{ marginBottom: 28 }}>
					<HashtagSearch
						hashtags={allHashtags}
						onChange={(selected) => {
							if (
								JSON.stringify(selected) !==
								JSON.stringify(selectedHashtags)
							) {
								setSelectedHashtags(selected);
							}
						}}
					/>
				</div>

				{/* Initiative or Charity */}
				<div style={{ marginBottom: 28 }}>
					<RadioGroupField
						label={
							<span>
								Is this a charity program?
								<span style={{ color: "red" }}>*</span>
								{highlightUnfilled &&
									isCharity === undefined && (
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
						name="initiative-radio-btn-group"
						value={
							isCharity === undefined
								? ""
								: isCharity
									? "yes"
									: "no"
						}
						options={[
							{ value: "yes", label: "Yes" },
							{ value: "no", label: "No" },
						]}
						onChange={(e) => setIsCharity(e === "yes")}
					/>
				</div>

				{/* Initiative */}
				<TextField
					label={
						<span>
							Purpose for Initiative
							<span style={{ color: "red" }}>*</span>
							{highlightUnfilled && type === "" && (
								<span style={{ color: "red" }}>
									&nbsp;(fill out)
								</span>
							)}
						</span>
					}
					placeholder="Why are you looking to achieve? Participants will be able to see your answer."
					multiline
					rows={4}
					style={{
						marginBottom: 28,
					}}
					InputLabelProps={{
						shrink: true,
						style: { color: "black" },
					}}
					value={type || ""}
					onChange={(e) => setType(e.target.value)}
				/>

				{/* Public or Private  & Experience in Program Planning */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 24,
					}}
				>
					<RadioGroupField
						label={
							<span>
								Who can participate in this program?
								<span style={{ color: "red" }}>*</span>
								{highlightUnfilled &&
									isPublic === undefined && (
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
						explanation={
							<>
								<p>Private programs are ...</p>
								<p>Public programs are ...</p>
								<p
									style={{
										textAlign: "right",
										marginTop: 14,
									}}
								>
									Is this clear?
								</p>
								<a
									href="/#"
									style={{
										width: "100%",
										display: "flex",
										justifyContent: "flex-end",
										color: "inherit",
										textDecoration: "underline",
										textUnderlineOffset: "5px",
										textDecorationColor:
											"rgba(0, 0, 0, 0.28)",
									}}
								>
									Find out more...
								</a>
							</>
						}
						name="participate-radio-btn-group"
						value={
							isPublic === undefined
								? ""
								: isPublic
									? "public"
									: "private"
						}
						options={[
							{ value: "public", label: "Anyone (Public)" },
							{
								value: "private",
								label: "By Invite only (Private)",
							},
						]}
						onChange={(e) => setIsPublic(e === "public")}
					/>

					<RadioGroupField
						label="Do you have experience in program planning?"
						name="experience-radio-btn-group"
						value={
							experience === undefined
								? ""
								: experience
									? "yes"
									: "no"
						}
						options={[
							{ value: "yes", label: "Yes" },
							{ value: "no", label: "No" },
						]}
						onChange={(e) => setExperience(e === "yes")}
					/>
				</div>

				{/* TODO: Implement linking to user profile functionality */}
				<div style={{ marginTop: 28 }}>
					<AddContainer label="Add your profile" />
				</div>
			</FormControl>
		</div>
	);
};

export default BasicInformation;
