import React from "react";
import "./Budget.css";

function Budget() {
	return (
		<>
			<div className="budget-group-container margin-bottom">
				<h2 className="budget-heading">Budget</h2>
				<a href="/" className="budget-link">
					View Transaction History
				</a>
			</div>
			<div className="budget-container margin-top">
				<div className="budget-item-container">
					<p className="budget-text">Balance</p>
					<p className="budget-sub-heading">$0</p>
				</div>
				<div className="budget-item-container">
					<p className="budget-text">Expenses</p>
					<p className="budget-sub-heading">$0</p>
				</div>
				<div className="budget-item-container">
					<p className="budget-text">Revenue</p>
					<p className="budget-sub-heading">$0</p>
				</div>
			</div>
		</>
	);
}

export default Budget;
