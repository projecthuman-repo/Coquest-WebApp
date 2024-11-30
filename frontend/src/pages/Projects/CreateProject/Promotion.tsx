import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import MapComponent from "../../Programs/components/Location/MapComponent";
import InvitePeopleComponent from "../../Programs/components/Search/InvitePeopleComponent";
import { DragDropContextProvider } from "@/components/DragDrop/DragDropContext";
import DragDropWrapper from "@/components/DragDrop/DragDropWrapper";
import { DragDropIMGRemoveRequest } from "@/components/DragDrop/DragDrop";
import { User } from "@/models/usermodel";
import { RegisteredRepType } from "@/models/common";
import { useProject } from "./ProjectContext";
import "./CreateProject.css";

const Promotion: React.FC = () => {
	const { project, updateProject, updateStepsCompleted } = useProject();

	const [promotionArea, setPromotionArea] = useState(project.promotionArea);
	const [headerImage, setHeaderImage] = useState<any[]>(
		project.headerImage ? [project.headerImage] : [],
	);
	const [sharelink, setShareLink] = useState(project.sharelink);
	const [usernames, setUsernames] = useState<User[]>([]);
	const [invitedPeople, setInvitedPeople] = useState<User[]>(
		project.invitedPeople,
	);

	const copyText = () => {
		navigator.clipboard.writeText(sharelink);
		alert("Project Invite copied to clipboard.");
	};

	useEffect(() => {
		// TODO: Get actual sharelink (using project id (currently id is undefined) or other unique identifier)
		setShareLink(`sharelink.com/project/${project.id}`);

		// TODO: Fetch usernames from backend
		const temp: User[] = [];
		for (let i = 0; i < 10; i++) {
			const user: User = new User({
				_id: i.toString(),
				username: "username" + i,
				email: `user${i}@example.com`,
				name: {
					first: "User",
					last: `Last${i}`,
				},
				registered: {
					type: RegisteredRepType.BOOLEAN,
					boolValue: true,
				},
				location: null,
				images: null,
				motives: [],
				biography: null,
				topics: [],
				communities: null,
				skills: null,
				badges: null,
				currentLevel: 0,
				recommendations: null,
			});
			temp.push(user);
		}
		setUsernames(temp);
	}, [project.id]);

	// remove previous header image when new one is uploaded
	useEffect(() => {
		if (headerImage.length > 1) {
			DragDropIMGRemoveRequest(headerImage[0].path);
			setHeaderImage([headerImage[headerImage.length - 1]]);
		}
	}, [headerImage]);

	// Update project with promotion details
	const updateProjectPromotion = () => {
		const updatedProject = {
			...project,
			promotionArea,
			headerImage: headerImage.length > 0 ? headerImage[0].path : "",
			sharelink,
			invitedPeople,
		};

		// steps has no required fields, checked true when user enters it
		updateStepsCompleted("promotion", true, false);

		updateProject(updatedProject);
	};

	// Update project whenever any field changes
	useEffect(() => {
		updateProjectPromotion();
	}, [promotionArea, headerImage, sharelink, invitedPeople]);

	return (
		<div className="content-view">
			<h1 className="title-field">Promote Project</h1>

			{/* Promotion Area and Radius (interactive map) */}
			<p className="subtitle-field" style={{ marginBottom: "28px" }}>
				Set the promotion area of the project
			</p>
			<MapComponent
				promotionArea={promotionArea}
				setPromotionArea={setPromotionArea}
			/>

			{/* Header Image with Drag and Drop Upload */}
			<p className="subtitle-field" style={{ marginBottom: "28px" }}>
				Add a header image
			</p>
			<DragDropContextProvider
				attachments={headerImage}
				setAttachments={setHeaderImage}
			>
				<DragDropWrapper
					images={headerImage}
					updateData={setHeaderImage}
					multiUpload={false}
				/>
			</DragDropContextProvider>

			{/* Share link and Invite People*/}
			<p className="subtitle-field" style={{ marginBottom: "28px" }}>
				Invite and Share
			</p>
			<div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
				<TextField
					style={{ flex: 1 }}
					label="Share link"
					className="styled-textfield placeholder-mod"
					value={sharelink || ""}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<Button
					style={{
						borderColor: "black",
						color: "black",
						borderRadius: "25px",
						padding: "5px 20px",
					}}
					variant="outlined"
					onClick={copyText}
				>
					Copy
				</Button>
			</div>
			<InvitePeopleComponent
				usernames={usernames.map((user) => user.username)}
				onChange={(selected) => {
					if (
						JSON.stringify(selected) !==
						JSON.stringify(
							invitedPeople.map((user) => user.username),
						)
					) {
						setInvitedPeople(
							usernames.filter((user) =>
								selected.includes(user.username),
							),
						);
					}
				}}
			/>
		</div>
	);
};

export default Promotion;
