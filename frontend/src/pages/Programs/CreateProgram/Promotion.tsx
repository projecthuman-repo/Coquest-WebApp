import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import MapComponent from "../components/Location/MapComponent";
import InvitePeopleComponent from "../components/Search/InvitePeopleComponent";
import { DragDropContextProvider } from "@/components/DragDrop/DragDropContext";
import DragDropWrapper from "@/components/DragDrop/DragDropWrapper";
import { DragDropIMGRemoveRequest } from "@/components/DragDrop/DragDrop";
import { Member, Location } from "@/models/programModel";
import { useProgram } from "./ProgramContext";
import "./CreateProgram.css";

const Promotion: React.FC = () => {
	const { program, updateProgram, updateStepsCompleted } = useProgram();

	const [promotionArea, setPromotionArea] = useState<Location | null>(
		program.promotionArea || null,
	);
	const [radius, setRadius] = useState<number | null>(
		program.radius ? parseInt(program.radius) : null,
	);
	const [headerImage, setHeaderImage] = useState<any[]>(
		program.promotionImage ? [program.promotionImage] : [],
	);
	const [sharelink, setShareLink] = useState<string>(program.shareLink || "");
	const [usernames, setUsernames] = useState<Member[]>([]); // members (users) in the system that can be invited
	const [members, setMembers] = useState<Member[]>(program.members || []);

	const copyText = () => {
		navigator.clipboard.writeText(sharelink);
		alert("Program Invite copied to clipboard.");
	};

	useEffect(() => {
		// TODO: Get actual sharelink (using program id (currently id is undefined) or other unique identifier)
		setShareLink(`sharelink.com/program/${program._id}`);

		// TODO: Fetch usernames from backend
		const temp: Member[] = [];
		for (let i = 0; i < 10; i++) {
			temp.push({ _id: i.toString(), username: `user${i}` });
		}
		setUsernames(temp);
	}, []);

	// remove previous header image when new one is uploaded
	useEffect(() => {
		if (headerImage.length > 1) {
			DragDropIMGRemoveRequest(headerImage[0].path);
			setHeaderImage([headerImage[headerImage.length - 1]]);
		}
	}, [headerImage]);

	// Update program with promotion details
	const updateProgramPromotion = () => {
		const updatedProgram = {
			...program,
			promotionArea,
			radius: radius ? radius.toString() : null,
			promotionImage: headerImage.length > 0 ? headerImage[0].path : "",
			shareLink: sharelink,
			members,
		};

		// steps has no required fields, checked true when user enters it
		updateStepsCompleted("promotion", true, false);

		updateProgram(updatedProgram);
	};

	// Update program whenever any field changes
	useEffect(() => {
		updateProgramPromotion();
	}, [promotionArea, headerImage, radius, sharelink, members]);

	return (
		<div className="content-view">
			<h1 className="title-field">Promote Program</h1>

			{/* Promotion Area and Radius (interactive map) */}
			<p className="subtitle-field" style={{ marginBottom: "28px" }}>
				Set the promotion area of the program
			</p>
			<MapComponent
				promotionArea={promotionArea || null}
				setPromotionArea={setPromotionArea}
				radius={radius || null}
				setRadius={setRadius}
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
				usernames={usernames
					.map((user) => user.username)
					.filter((username): username is string => !!username)}
				onChange={(selected) => {
					if (
						JSON.stringify(selected) !==
						JSON.stringify(members.map((user) => user.username))
					) {
						setMembers(
							usernames.filter((user) => {
								if (user.username) {
									return selected.includes(user.username);
								}
							}),
						);
					}
				}}
			/>
		</div>
	);
};

export default Promotion;
