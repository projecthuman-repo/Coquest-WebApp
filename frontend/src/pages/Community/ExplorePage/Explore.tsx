import React, { useEffect, useState } from "react";
import Repository from "../../../repositories/repository";
import { Community } from "../../../models/communitymodel";
import "./Explore.css";

function CommunityExplore() {
	// Community Data Variables
	const [communities, setCommunities] = useState<Community[]>([]);
	const communityIds = [
		"666e0c9d083f13aec99b880c",
		"663132c84b4569c7ef32a76e",
		"66315a7a4b4569c7ef32a8cb",
		"66315a9e4b4569c7ef32a8d6",
		"66394037e228ee2a0b95d1b8",
		"6685b7eaa5405ac0c4d4d315",
		"66394037e228ee2a0b95d1b8",
		"6685b7eaa5405ac0c4d4d315",
	]; // Placeholder Community IDs

	useEffect(() => {
		const repository = Repository.getInstance("Community", Community);
		const fetchCommunities = async () => {
			try {
				const fetchPromises = communityIds.map(async (id) => {
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
					return await repository.fetch(community).toPromise();
				});
				const fetchedCommunities = await Promise.all(fetchPromises);
				const validCommunities = fetchedCommunities.filter(
					(community): community is Community =>
						community !== null && community !== undefined,
				);
				setCommunities(validCommunities);
			} catch (error) {
				console.error("Error fetching communities:", error);
			}
		};
		fetchCommunities();
	});

	return (
		<>
			<div className="community-explore-page">
				<h1 className="ce-main-heading">Communities</h1>
				<div className="ce-search-container">
					<input
						type="search"
						className="ce-search"
						name="search"
						placeholder="Search Communities"
					/>
					<img
						src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png"
						alt="search-icon"
						className="ce-search-icon"
					/>
				</div>
				<div className="ce-communities-container">
					{communities.map((community, index) => (
						<div key={index} className="ce-community-container">
							<div className="ce-image-container">
								<button>
									{/* TODO: Add a relevant placeholder image here when the community image is not found. */}
									<img
										src={
											community?.images?.[0]?.path ??
											"/map_image.png"
										}
										alt={community?.name}
										className="ce-image-design"
									/>
								</button>
							</div>
							<div className="ce-heading-button-container">
								<h3 className="ce-sub-heading">
									{community?.name}
								</h3>
								<button className="ce-join-button-design">
									Join
								</button>
							</div>
							<p className="ce-sub-text margin-b">Location</p>
							<p className="ce-sub-text">
								{community?.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default CommunityExplore;
