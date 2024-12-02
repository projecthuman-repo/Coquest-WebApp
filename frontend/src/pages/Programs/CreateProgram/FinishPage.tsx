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
					<strong>Description:</strong> {program.summary || "N/A"}
				</p>
				<p>
					<strong>Objective:</strong> {program.mission || "N/A"}
				</p>
				<p>
					<strong>Category:</strong> {program.category || "N/A"}
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
					{program.hashtags && program.hashtags.length > 0
						? program.hashtags.join(", ")
						: "None"}
				</p>
			</div>

			{/* Operations */}
			<div className="review-section">
				<h2>Operations</h2>
				<p>
					<strong>Location:</strong>{" "}
					{program.location ? program.location.name : "N/A"}
				</p>
				<p>
					<strong>Date:</strong>{" "}
					{program.startDate
						? new Date(program.startDate).toLocaleDateString(
								"en-US",
								{
									year: "numeric",
									month: "long",
									day: "numeric",
								},
							)
						: "N/A"}{" "}
					-{" "}
					{program.endDate
						? new Date(program.endDate).toLocaleDateString(
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
					{program.recurring &&
						program.recurring.charAt(0).toUpperCase() +
							program.recurring.slice(1)}
					&nbsp;from {program.startTime || "N/A"} to{" "}
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
					{program.openToBartering ? "Yes" : "No"}
				</p>
				<p>
					<strong>Total Budget Expenses:</strong> $
					{program.totalBudgetExpenses || 0}
				</p>
				{program.budgetingItems &&
					program.budgetingItems.length > 0 && (
						<>
							<p>
								<strong>Budget Expenses</strong>
							</p>
							<ul>
								{program.budgetingItems.map(
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
					{program.needsCrowdfunding !== undefined &&
					program.needsCrowdfunding
						? "Yes"
						: "No"}
				</p>
				{program.needsCrowdfunding && (
					<>
						<p>
							<strong>Crowdfund Amount:</strong> $
							{program.crowdfundingAmount || 0}
						</p>
						<p>
							<strong>Date of Funding:</strong>{" "}
							{program.crowdfundingDate || "N/A"}
						</p>
						<p>
							<strong>Thank You Message:</strong>{" "}
							{program.crowdfundingMessage || "N/A"}
						</p>
					</>
				)}
			</div>

			{/* Promotion */}
			<div className="review-section">
				<h2>Promotion</h2>
				<p>
					<strong>Promotion Area:</strong>{" "}
					{program.promotionArea && program.promotionArea?.name
						? program.promotionArea.name
						: "N/A"}
				</p>

				<p>
					<strong>Radius:</strong>{" "}
					{program.radius
						? `${(parseInt(program.radius) / 1000).toFixed(2)} km`
						: "N/A"}
				</p>

				<p>
					<strong>Header Image:</strong>{" "}
					{program.promotionImage ? (
						<>
							<br />
							<img
								src={program.promotionImage}
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
					{program.shareLink ? (
						<a
							href={program.shareLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							{program.shareLink}
						</a>
					) : (
						"N/A"
					)}
				</p>

				{program.members && program.members.length > 0 && (
					<>
						<p>
							<strong>Invited People</strong>
						</p>
						<ul>
							{program.members.map((person, index) => (
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
