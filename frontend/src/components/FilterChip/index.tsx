import React from "react";
import "./index.css";

function FilterChip(props: { label: string; onClick?: () => void }) {
	function onClick() {
		props.onClick && props.onClick();

		const filterOptions = document.querySelectorAll(".filter-chip");
		filterOptions.forEach((option) => {
			if (option.querySelector("input")?.checked) {
				option.classList.add("active");
			} else {
				option.classList.remove("active");
			}
		});
	}
	return (
		<label className="filter-chip" onClick={onClick}>
			<input type="radio" name="filter" />
			{props.label}
		</label>
	);
}

export default FilterChip;
