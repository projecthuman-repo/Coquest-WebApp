import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Repository from "../../../repositories/repository";
import { Community } from "../../../models/communitymodel";
import CommunityDescriptionOverview from "./Components/Overview";
import CommunityDescriptionPrograms from "./Components/Programs";
import CommuntiyDescriptionProjects from "./Components/Projects";
import CommunityDescriptionCoops from "./Components/Coops";
import "./Description.css";

function CommunityDescription() {
	// Navigation Button Variable
	const [section, setSection] = useState("overview");

	// Community Data Variables
	const [communityData, setCommunityData] = useState<Community | null>(null);
	const { id } = useParams();

	// Fetch for Community Data
	useEffect(() => {
		const repository = Repository.getInstance("Community", Community);
		const fetchCommunity = async () => {
			try {
				const communityData = {
					_id: id,
					name: "",
					description: "",
					objective: "",
					initiative: "",
					location: null,
					members: [],
				};
				const community = new Community(communityData);
				const fetchedCommunity = await repository
					.fetch(community)
					.toPromise();
				if (fetchedCommunity) {
					setCommunityData(fetchedCommunity); // Update state with fetched community data
				} else {
					console.error("Community data not found");
				}
				console.log(fetchedCommunity);
			} catch (error) {
				console.error("Error fetching community data:", error);
			}
		};
		fetchCommunity();
	}, [id]);

	console.log(communityData);

	return (
		<>
			{communityData != null ? (
				<div className="community-description-page">
					<div className="com-d-header-container">
						<h1 className="com-d-main-heading">
							{communityData.name}
						</h1>
						<button className="com-d-signup-design">Sign Up</button>
					</div>
					{/* Main Navigation Buttons */}
					<div className="com-d-nav-button-container">
						<button
							className={`com-d-button-design ${
								section === "overview" ? "com-d-selected" : ""
							}`}
							onClick={() => setSection("overview")}
						>
							Overview
						</button>
						<button
							className={`com-d-button-design ${
								section === "programs" ? "com-d-selected" : ""
							}`}
							onClick={() => setSection("programs")}
						>
							Programs
						</button>
						<button
							className={`com-d-button-design ${
								section === "projects" ? "com-d-selected" : ""
							}`}
							onClick={() => setSection("projects")}
						>
							Projects
						</button>
						<button
							className={`com-d-button-design ${
								section === "co-ops" ? "com-d-selected" : ""
							}`}
							onClick={() => setSection("co-ops")}
						>
							Co-ops
						</button>
					</div>
					{/* Overview Section */}
					{section === "overview" && (
						<CommunityDescriptionOverview data={communityData} />
					)}
					{/* Programs Section */}
					{section === "programs" && <CommunityDescriptionPrograms />}
					{/* Projects Section */}
					{section === "projects" && <CommuntiyDescriptionProjects />}
					{/* Co-ops Section */}
					{section === "co-ops" && <CommunityDescriptionCoops />}
				</div>
			) : (
				<div className="community-description-page">
					<h1 className="com-d-main-heading margin-bottom">
						Community Not Found.
					</h1>
					<p className="com-d-sub-text">
						Check if the ID in the URL matches the community you are
						trying to find before trying again.
					</p>
				</div>
			)}
		</>
	);
}

export default CommunityDescription;
