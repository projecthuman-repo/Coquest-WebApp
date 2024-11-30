import React, { useState, useEffect } from "react";
import { FormControl, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { RadioGroupField } from "../components/RadioGroupField";
import HashtagSearch from "../components/Search/HashtagSearch";
import AddContainer from "../components/AddContainer";
import { useProgram } from "./ProgramContext";
import { Hashtag, Admin, Category } from "../../../models/programModel";
import "./CreateProgram.css";

const BasicInformation = () => {
	const { program, updateProgram, stepsCompleted, updateStepsCompleted } =
		useProgram();
	const highlightUnfilled =
		stepsCompleted["basic-information"].highlightUnfilled;

	const [programName, setProgramName] = useState<string>(program.name);
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		program.category,
	);
	const [description, setDescription] = useState<string>(program.description);
	const [objective, setObjective] = useState<string>(program.objective);
	const [allHashtags, setAllHashtags] = useState<Hashtag[]>([]);
	const [selectedHashtags, setSelectedHashtags] = useState<Hashtag[]>(
		program.hashtags,
	);
	const [isCharity, setIsCharity] = useState(program.isCharity);
	const [initiative, setInitiative] = useState<string>(program.initiative);
	const [isPublic, setIsPublic] = useState(program.isPublic);
	const [experience, setExperience] = useState(
		program.admin?.experienceInPlanning,
	);

	useEffect(() => {
		// TODO: fetch categories from backend
		const tempCategories: Category[] = [
			{ id: "1", name: "Option 1" },
			{ id: "2", name: "Option 2" },
			{ id: "3", name: "Option 3" },
			{ id: "4", name: "Option 4" },
		];
		setCategories(tempCategories);

		// TODO: fetch hashtags from backend
		const tempHtags: Hashtag[] = Array.from({ length: 100 }, (_, i) => ({
			id: `${i + 1}`,
			name: `hashtag${i + 1}`,
		}));
		setAllHashtags(tempHtags);
	}, []);

	// Update program with basic information
	const updateProgramBasicInfo = () => {
		const updatedProgram = {
			...program,
			name: programName,
			category: selectedCategory,
			description: description,
			objective: objective,
			initiative: initiative,
			isPublic: isPublic,
			isCharity: isCharity,
			hashtags: selectedHashtags,
			admin: {
				...program.admin,
				id: program.admin?.id, // TODO: fetch admin (creator) id from backend
				experienceInPlanning: experience,
			} as Admin,
		};

		// criteria for passing basic information step
		const canProceed =
			updatedProgram.name !== "" &&
			updatedProgram.description !== "" &&
			updatedProgram.objective !== "" &&
			updatedProgram.isCharity !== undefined &&
			updatedProgram.initiative !== "" &&
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
		description,
		objective,
		selectedHashtags,
		isCharity,
		initiative,
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
					value={selectedCategory ? selectedCategory.id : "default"}
					onChange={(e) => {
						const category = categories.find(
							(c) => c.id === e.target.value,
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
					{categories.map((category) => (
						<MenuItem key={category.id} value={category.id}>
							{category.name}
						</MenuItem>
					))}
				</TextField>

				{/* Program Description */}
				<TextField
					style={{
						marginBottom: 28,
					}}
					label={
						<span>
							Program description
							<span style={{ color: "red" }}>*</span>
							{highlightUnfilled && description === "" && (
								<span style={{ color: "red" }}>
									&nbsp;(fill out)
								</span>
							)}
						</span>
					}
					placeholder="Create a description for your program"
					className="placeholder-mod styled-textfield"
					value={description || ""}
					onChange={(e) => setDescription(e.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
					multiline
					rows={4}
				/>

				{/* Program Objective */}
				<TextField
					style={{
						marginBottom: 28,
					}}
					label={
						<span>
							Program Objective
							<span style={{ color: "red" }}>*</span>
							{highlightUnfilled && objective === "" && (
								<span style={{ color: "red" }}>
									&nbsp;(fill out)
								</span>
							)}
						</span>
					}
					placeholder="State the goal for your program"
					className="placeholder-mod styled-textfield"
					value={objective || ""}
					onChange={(e) => setObjective(e.target.value)}
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
							{highlightUnfilled && initiative === "" && (
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
					value={initiative || ""}
					onChange={(e) => setInitiative(e.target.value)}
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
