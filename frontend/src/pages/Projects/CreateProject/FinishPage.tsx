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
					<strong>Description:</strong> {project.description || "N/A"}
				</p>
				<p>
					<strong>Objective:</strong> {project.objective || "N/A"}
				</p>
				<p>
					<strong>Category:</strong> {project.category?.name || "N/A"}
				</p>
				<p>
					<strong>Charity or Initiative:</strong>{" "}
					{project.isCharity ? "Charity" : "Initiative"}
				</p>
				<p>
					<strong>Purpose for initiative:</strong>{" "}
					{project.initiative ? project.initiative : "N/A"}
				</p>
				<p>
					<strong>Public/Private:</strong>{" "}
					{project.isPublic ? "Public" : "Private"}
				</p>
				<p>
					<strong>Hashtags:</strong>{" "}
					{project.hashtags.length > 0
						? project.hashtags
								.map((tag) => `#${tag.name}`)
								.join(", ")
						: "None"}
				</p>
			</div>

			{/* Operations */}
			<div className="review-section">
				<h2>Operations</h2>
				<p>
					<strong>Location:</strong> {project.location || "N/A"}
				</p>
				<p>
					<strong>Date:</strong>{" "}
					{project.startDate?.toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					}) || "N/A"}{" "}
					-{" "}
					{project.endDate?.toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					}) || "N/A"}
				</p>
				<p>
					<strong>Time:</strong>{" "}
					{project.recurring &&
						project.recurring.charAt(0).toUpperCase() +
							project.recurring.slice(1)}
					&nbsp;at {project.startTime || "N/A"} to{" "}
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
					{project.isOpenToBarter ? "Yes" : "No"}
				</p>
				<p>
					<strong>Total Budget Expenses:</strong> $
					{project.totalBudgetExpenses || 0}
				</p>
				{project.budgetExpenses.length > 0 && (
					<>
						<p>
							<strong>Budget Expenses</strong>
						</p>
						<ul>
							{project.budgetExpenses.map((expense, index) => (
								<li key={index}>
									<strong>{expense.name}:</strong> $
									{expense.costTotal} (Quantity:{" "}
									{expense.quantity})
								</li>
							))}
						</ul>
					</>
				)}
			</div>

			{/* Crowdfunding */}
			<div className="review-section">
				<h2>Crowdfunding</h2>
				<p>
					<strong>Crowdfunding Needed:</strong>{" "}
					{project.crowdfunding.needed ? "Yes" : "No"}
				</p>
				{project.crowdfunding.needed && (
					<>
						<p>
							<strong>Crowdfund Amount:</strong> $
							{project.crowdfunding.amount || 0}
						</p>
						<p>
							<strong>Date of Funding:</strong>{" "}
							{project.crowdfunding.dateOfFunding?.toLocaleDateString(
								"en-US",
								{
									year: "numeric",
									month: "long",
									day: "numeric",
								},
							) || "N/A"}
						</p>
						<p>
							<strong>Thank You Message:</strong>{" "}
							{project.crowdfunding.thankyouMessage || "None"}
						</p>
					</>
				)}
			</div>

			{/* Promotion */}
			<div className="review-section">
				<h2>Promotion</h2>
				<p>
					<strong>Promotion Area:</strong>{" "}
					{project.promotionArea?.locationName
						? `${project.promotionArea.locationName}`
						: "N/A"}
				</p>

				<p>
					<strong>Radius:</strong>{" "}
					{project.promotionArea?.radius
						? `${(project.promotionArea.radius / 1000).toFixed(2)} km`
						: "N/A"}
				</p>

				<p>
					<strong>Header Image:</strong>{" "}
					{project.headerImage ? (
						<>
							<br />
							<img
								src={project.headerImage}
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
					<a
						href={project.sharelink}
						target="_blank"
						rel="noopener noreferrer"
					>
						{project.sharelink}
					</a>
				</p>

				{project.invitedPeople.length > 0 && (
					<>
						<p>
							<strong>Invited People</strong>
						</p>
						<ul>
							{project.invitedPeople.map((person, index) => (
								<li key={index}>
									{person.username} - {person.email}
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
