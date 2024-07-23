import React from "react";
import "./Funding.css";

function Funding() {
	return (
		<>
			<h2 className="funding-heading">Funding</h2>
			<div className="funding-group-container margin-top">
				<h2 className="funding-text">
					You are at 0% of your crowdfunding goal.
				</h2>
				<a href="/" className="funding-link">
					Edit Goal
				</a>
			</div>
			<div className="ppb-progress-bar"></div>
			<div className="funding-group-container margin-top">
				<h2 className="funding-heading">$0</h2>
				<h2 className="funding-heading">$0</h2>
			</div>
			<div className="funding-group-container margin-top">
				<h2 className="funding-sub-heading">Backers</h2>
				<a href="/" className="funding-link">
					View All
				</a>
			</div>
			<div className="funding-backer-container">
				<p className="funding-text">
					<b>Name</b>
				</p>
				<p>
					<b>Amount</b>
				</p>
			</div>
			<div className="funding-backer-container">
				<p className="funding-text">John Doe</p>
				<p>$0</p>
			</div>
			<div className="funding-backer-container">
				<p className="funding-text">John Doe</p>
				<p>$0</p>
			</div>
			<div className="funding-backer-container">
				<p className="funding-text">John Doe</p>
				<p>$0</p>
			</div>
		</>
	);
}

export default Funding;
