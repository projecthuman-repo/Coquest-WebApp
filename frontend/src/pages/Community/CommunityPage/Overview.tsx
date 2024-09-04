import React from "react";
import Members from "../../../components/Members/index";
import Maps from "../../../components/Maps/Maps";
import Quests from "../../../components/Quests";
import Calendar from "../../../components/SharedCalendar/SharedCalendar";
import "./index.css";
import "./Overview.css";

function CommunityPageOverview({ data }: { data: any }) {
	return (
		<>
			<div className="com-o-flex-widget-container">
				<div className="com-o-left">
					{/* Description, Objective and Initiative */}
					<div className="com-o-background">
						<div className="quest-header-container">
							<h2 className="com-o-sub-heading">Description</h2>
							<a href="/" className="com-o-link">
								Edit
							</a>
						</div>
						<p className="com-o-sub-text margin-top margin-bottom">
							{data.description}
						</p>
						<h2 className="com-o-sub-heading margin-bottom">
							Objective
						</h2>
						<p className="com-o-sub-text margin-bottom">N/A</p>
						<h2 className="com-o-sub-heading margin-bottom">
							Initiative
						</h2>
						<p className="com-o-sub-text margin-bottom">N/A</p>
					</div>
					{/* Members */}
					<div className="com-o-background">
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
				</div>
				<div className="com-o-right">
					{/* Calendar */}
					<div className="com-o-background">
						<h2 className="com-o-sub-heading margin-bottom">
							Calendar
						</h2>
						<Calendar />
					</div>
					{/* Quests */}
					<div className="com-o-background">
						<Quests
							showAllLink={`${window.location.pathname}/quests`}
						/>
					</div>
				</div>
			</div>
			<div className="com-o-widget-container">
				{/* Location */}
				<div className="com-o-location-background">
					<h2 className="com-o-sub-heading">Location</h2>
					<div className="com-o-map-design">
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

export default CommunityPageOverview;
