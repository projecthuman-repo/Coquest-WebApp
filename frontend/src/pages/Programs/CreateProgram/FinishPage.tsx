import React from "react";
import { useProgram } from "./ProgramContext";
import "./CreateProgram.css";

const FinishPage: React.FC = () => {
	const { program } = useProgram();

	return (
		<div className="content-view">
			<h1 className="title-field">Program Review</h1>

			{/* Basic Information */}
			<div className="review-section">
				<h2>Basic Information</h2>
				<p>
					<strong>Program Name:</strong> {program.name || "N/A"}
				</p>
				<p>
					<strong>Description:</strong> {program.description || "N/A"}
				</p>
				<p>
					<strong>Objective:</strong> {program.objective || "N/A"}
				</p>
				<p>
					<strong>Category:</strong> {program.category?.name || "N/A"}
				</p>
				<p>
					<strong>Charity or Initiative:</strong>{" "}
					{program.isCharity ? "Charity" : "Initiative"}
				</p>
				<p>
					<strong>Public/Private:</strong>{" "}
					{program.isPublic ? "Public" : "Private"}
				</p>
				<p>
					<strong>Hashtags:</strong>{" "}
					{program.hashtags.length > 0
						? program.hashtags
								.map((tag) => `#${tag.name}`)
								.join(", ")
						: "None"}
				</p>
			</div>

			{/* Operations */}
			<div className="review-section">
				<h2>Operations</h2>
				<p>
					<strong>Location:</strong> {program.location || "N/A"}
				</p>
				<p>
					<strong>Date:</strong>{" "}
					{program.startDate?.toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					}) || "N/A"}{" "}
					-{" "}
					{program.endDate?.toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					}) || "N/A"}
				</p>
				<p>
					<strong>Time:</strong>{" "}
					{program.recurring &&
						program.recurring.charAt(0).toUpperCase() +
							program.recurring.slice(1)}
					&nbsp;at {program.startTime || "N/A"} to{" "}
					{program.endTime || "N/A"}
				</p>
			</div>

			{/* Budgeting */}
			<div className="review-section">
				<h2>Budgeting</h2>
				<p>
					<strong>Cost:</strong>{" "}
					{program.cost ? `$${program.cost}` : "N/A"}
				</p>
				<p>
					<strong>Max participants:</strong>{" "}
					{program.spots || "No Limit"}
				</p>
				<p>
					<strong>Open to Barter:</strong>{" "}
					{program.isOpenToBarter ? "Yes" : "No"}
				</p>
				<p>
					<strong>Total Budget Expenses:</strong> $
					{program.totalBudgetExpenses || 0}
				</p>
				{program.budgetExpenses.length > 0 && (
					<>
						<p>
							<strong>Budget Expenses</strong>
						</p>
						<ul>
							{program.budgetExpenses.map((expense, index) => (
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
					{program.crowdfunding.needed ? "Yes" : "No"}
				</p>
				{program.crowdfunding.needed && (
					<>
						<p>
							<strong>Crowdfund Amount:</strong> $
							{program.crowdfunding.amount || 0}
						</p>
						<p>
							<strong>Date of Funding:</strong>{" "}
							{program.crowdfunding.dateOfFunding?.toLocaleDateString(
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
							{program.crowdfunding.thankyouMessage || "None"}
						</p>
					</>
				)}
			</div>

			{/* Promotion */}
			<div className="review-section">
				<h2>Promotion</h2>
				<p>
					<strong>Promotion Area:</strong>{" "}
					{program.promotionArea?.locationName
						? `${program.promotionArea.locationName}`
						: "N/A"}
				</p>

				<p>
					<strong>Radius:</strong>{" "}
					{program.promotionArea?.radius
						? `${(program.promotionArea.radius / 1000).toFixed(2)} km`
						: "N/A"}
				</p>

				<p>
					<strong>Header Image:</strong>{" "}
					{program.headerImage ? (
						<>
							<br />
							<img
								src={program.headerImage}
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
						href={program.sharelink}
						target="_blank"
						rel="noopener noreferrer"
					>
						{program.sharelink}
					</a>
				</p>

				{program.invitedPeople.length > 0 && (
					<>
						<p>
							<strong>Invited People</strong>
						</p>
						<ul>
							{program.invitedPeople.map((person, index) => (
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
