import React, { useState, useEffect } from "react";
import { FormControl, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { RadioGroupField } from "../../Programs/components/RadioGroupField";
import HashtagSearch from "../../Programs/components/Search/HashtagSearch";
import AddContainer from "../../Programs/components/AddContainer";
import { useProject } from "./ProjectContext";
import "./CreateProject.css";

const BasicInformation = () => {
	const { project, updateProject, stepsCompleted, updateStepsCompleted } =
		useProject();
	const highlightUnfilled =
		stepsCompleted["basic-information"].highlightUnfilled;

	const [projectName, setProjectName] = useState<string>(project.name || "");
	const [categories, setCategories] = useState<string[]>([]); // categories in the system
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		project.category || null,
	);
	const [summary, setSummary] = useState<string>(project.summary || "");
	const [mission, setMission] = useState<string>(project.mission || "");
	const [allHashtags, setAllHashtags] = useState<string[]>([]); // hashtags in the system
	const [selectedHashtags, setSelectedHashtags] = useState<string[] | null>(
		project.hashtags || null,
	);
	const [isCharity, setIsCharity] = useState<boolean | undefined>(
		project.isCharity || undefined,
	);
	const [type, setType] = useState<string>(
		project.type || "",
	);
	const [isPublic, setIsPublic] = useState<boolean | undefined>(
		project.isPublic || undefined,
	);
	const [experience, setExperience] = useState(
		project.experienceInPlanning,
	);

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

	// Update project with basic information
	const updateProjectBasicInfo = () => {
		const updatedProject = {
			...project,
			name: projectName,
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
			updatedProject.name !== "" &&
			updatedProject.summary !== "" &&
			updatedProject.mission !== "" &&
			updatedProject.isCharity !== undefined &&
			updatedProject.type !== "" &&
			updatedProject.isPublic !== undefined;

		if (canProceed) {
			updateStepsCompleted("basic-information", true, false);
		} else {
			updateStepsCompleted("basic-information", false, highlightUnfilled);
		}

		updateProject(updatedProject);
	};

	// Update project whenever any field changes
	useEffect(() => {
		updateProjectBasicInfo();
	}, [
		projectName,
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
				{/* Project Name */}
				<TextField
					style={{
						marginBottom: 28,
					}}
					label={
						<span>
							Project name
							<span style={{ color: "red" }}>*</span>
							{highlightUnfilled && projectName === "" && (
								<span style={{ color: "red" }}>
									&nbsp;(fill out)
								</span>
							)}
						</span>
					}
					fullWidth
					placeholder="Name your project"
					value={projectName || ""}
					onChange={(e) => setProjectName(e.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
					className="styled-textfield"
				/>

				{/* Project Category */}
				<TextField
					style={{ marginBottom: 28 }}
					select
					label="Project Type"
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

				{/* Project summary */}
				<TextField
					style={{
						marginBottom: 28,
					}}
					label={
						<span>
							Project description
							<span style={{ color: "red" }}>*</span>
							{highlightUnfilled && summary === "" && (
								<span style={{ color: "red" }}>
									&nbsp;(fill out)
								</span>
							)}
						</span>
					}
					placeholder="Create a description for your project"
					className="placeholder-mod styled-textfield"
					value={summary || ""}
					onChange={(e) => setSummary(e.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
					multiline
					rows={4}
				/>

				{/* Project mission */}
				<TextField
					style={{
						marginBottom: 28,
					}}
					label={
						<span>
							Project Objective
							<span style={{ color: "red" }}>*</span>
							{highlightUnfilled && mission === "" && (
								<span style={{ color: "red" }}>
									&nbsp;(fill out)
								</span>
							)}
						</span>
					}
					placeholder="State the goal for your project"
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
								Is this a charity project?
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

				{/* Public or Private  & Experience in Project Planning */}
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
								Who can participate in this project?
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
								<p>Private projects are ...</p>
								<p>Public projects are ...</p>
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
						label="Do you have experience in project planning?"
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
