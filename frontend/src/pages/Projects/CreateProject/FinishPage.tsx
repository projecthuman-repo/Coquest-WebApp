import React from "react";
import { useProject } from "./ProjectContext";
import "./CreateProject.css";

const FinishPage: React.FC = () => {
	const { project } = useProject();

	return (
		<div className="content-view">
			<h1 className="title-field">Project Review</h1>

			{/* Basic Information */}
			<div className="review-section">
				<h2>Basic Information</h2>
				<p>
					<strong>Project Name:</strong> {project.name || "N/A"}
				</p>
				<p>
					<strong>Description:</strong> {project.summary || "N/A"}
				</p>
				<p>
					<strong>Objective:</strong> {project.mission || "N/A"}
				</p>
				<p>
					<strong>Category:</strong> {project.category || "N/A"}
				</p>
				<p>
					<strong>Charity or Initiative:</strong>{" "}
					{project.isCharity ? "Charity" : "Initiative"}
				</p>
				<p>
					<strong>Public/Private:</strong>{" "}
					{project.isPublic ? "Public" : "Private"}
				</p>
				<p>
					<strong>Hashtags:</strong>{" "}
					{project.hashtags && project.hashtags.length > 0
						? project.hashtags.join(", ")
						: "None"}
				</p>
			</div>

			{/* Operations */}
			<div className="review-section">
				<h2>Operations</h2>
				<p>
					<strong>Location:</strong>{" "}
					{project.location ? project.location.name : "N/A"}
				</p>
				<p>
					<strong>Date:</strong>{" "}
					{project.startDate
						? new Date(project.startDate).toLocaleDateString(
								"en-US",
								{
									year: "numeric",
									month: "long",
									day: "numeric",
								},
							)
						: "N/A"}{" "}
					-{" "}
					{project.endDate
						? new Date(project.endDate).toLocaleDateString(
								"en-US",
								{
									year: "numeric",
									month: "long",
									day: "numeric",
								},
							)
						: "N/A"}
				</p>
				<p>
					<strong>Time:</strong>{" "}
					{project.recurring &&
						project.recurring.charAt(0).toUpperCase() +
							project.recurring.slice(1)}
					&nbsp;from {project.startTime || "N/A"} to{" "}
					{project.endTime || "N/A"}
				</p>
			</div>

			{/* Budgeting */}
			<div className="review-section">
				<h2>Budgeting</h2>
				<p>
					<strong>Cost:</strong>{" "}
					{project.cost ? `$${project.cost}` : "N/A"}
				</p>
				<p>
					<strong>Max participants:</strong>{" "}
					{project.spots || "No Limit"}
				</p>
				<p>
					<strong>Open to Barter:</strong>{" "}
					{project.openToBartering ? "Yes" : "No"}
				</p>
				<p>
					<strong>Total Budget Expenses:</strong> $
					{project.totalBudgetExpenses || 0}
				</p>
				{project.budgetingItems &&
					project.budgetingItems.length > 0 && (
						<>
							<p>
								<strong>Budget Expenses</strong>
							</p>
							<ul>
								{project.budgetingItems.map(
									(expense, index) => (
										<li key={index}>
											<strong>{expense.name}:</strong> $
											{expense.costTotal} (Quantity:{" "}
											{expense.quantity})
										</li>
									),
								)}
							</ul>
						</>
					)}
			</div>

			{/* Crowdfunding */}
			<div className="review-section">
				<h2>Crowdfunding</h2>
				<p>
					<strong>Crowdfunding Needed:</strong>{" "}
					{project.needsCrowdfunding !== undefined &&
					project.needsCrowdfunding
						? "Yes"
						: "No"}
				</p>
				{project.needsCrowdfunding && (
					<>
						<p>
							<strong>Crowdfund Amount:</strong> $
							{project.crowdfundingAmount || 0}
						</p>
						<p>
							<strong>Date of Funding:</strong>{" "}
							{project.crowdfundingDate || "N/A"}
						</p>
						<p>
							<strong>Thank You Message:</strong>{" "}
							{project.crowdfundingMessage || "N/A"}
						</p>
					</>
				)}
			</div>

			{/* Promotion */}
			<div className="review-section">
				<h2>Promotion</h2>
				<p>
					<strong>Promotion Area:</strong>{" "}
					{project.promotionArea && project.promotionArea?.name
						? project.promotionArea.name
						: "N/A"}
				</p>

				<p>
					<strong>Radius:</strong>{" "}
					{project.radius
						? `${(parseInt(project.radius) / 1000).toFixed(2)} km`
						: "N/A"}
				</p>

				<p>
					<strong>Header Image:</strong>{" "}
					{project.promotionImage ? (
						<>
							<br />
							<img
								src={project.promotionImage}
								alt="Header"
								style={{ maxHeight: "100px" }}
							/>
						</>
					) : (
						"N/A"
					)}
				</p>

				<p>
					<strong>Share Link:</strong>{" "}
					{project.shareLink ? (
						<a
							href={project.shareLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							{project.shareLink}
						</a>
					) : (
						"N/A"
					)}
				</p>

				{project.members && project.members.length > 0 && (
					<>
						<p>
							<strong>Invited People</strong>
						</p>
						<ul>
							{project.members.map((person, index) => (
								<li key={person._id || index}>
									{person.username}
								</li>
							))}
						</ul>
					</>
				)}
			</div>
		</div>
	);
};

export default FinishPage;
