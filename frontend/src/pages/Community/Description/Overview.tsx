import React from "react";
import Members from "../../../components/Members/index";
import Maps from "../../../components/Maps/Maps";
import Quests from "../../../components/Quests/Quests";
import Calendar from "../../../components/SharedCalendar/SharedCalendar";
import "./Description.css";
import "./Overview.css";

function CommunityDescriptionOverview({ data }: { data: any }) {
	return (
		<>
			<div className="widget-container">
				{/* Description, Objective and Initiative */}
				<div className="background">
					<div className="quest-header-container">
						<h2 className="d-sub-heading">Description</h2>
						<a href="/" className="d-link">
							Edit
						</a>
					</div>
					<p className="d-sub-text margin-top margin-bottom">
						{data.description}
					</p>
					<h2 className="d-sub-heading margin-bottom">Objective</h2>
					<p className="d-sub-text margin-bottom">N/A</p>
					<h2 className="d-sub-heading margin-bottom">Initiative</h2>
					<p className="d-sub-text margin-bottom">N/A</p>
				</div>
				{/* Calendar */}
				<div className="background">
					<h2 className="d-sub-heading margin-bottom">Calendar</h2>
					<Calendar />
				</div>
			</div>
			<div className="widget-container">
				{/* Members */}
				<div className="background">
					<Members
						users={
							data.members?.map(
								(member: { name: any }) => member.name,
							) || []
						}
						userRole={["Role"]}
						showAllLink="#"
					/>
				</div>
				{/* Quests */}
				<div className="background">
					<div className="quest-header-container">
						<h2 className="d-sub-heading">Quests</h2>
						<a
							href={`/communities/${data.id}/quests`}
							className="d-link"
						>
							See All
						</a>
					</div>
					<Quests />
				</div>
			</div>
			<div className="widget-container">
				{/* Location */}
				<div className="location-background">
					<h2 className="d-sub-heading">Location</h2>
					<div className="map-design">
						<div className="checkbox-container">
							<input
								type="checkbox"
								id="sampleCheckbox"
								name="sampleCheckbox"
							/>
							<span className="d-sub-text margin-left">
								Allow for Location Information?
							</span>
						</div>
						<div className="checkbox-container margin-bottom">
							<input
								type="checkbox"
								id="sampleCheckbox"
								name="sampleCheckbox"
							/>
							<span className="d-sub-text margin-left">
								Receive Notifications?
							</span>
						</div>
						<Maps
							lat={data.location?.lat}
							long={data.location?.lng}
							mapZoom={14.5}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default CommunityDescriptionOverview;
