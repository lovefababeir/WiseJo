import React from "react";

const ResultsSubMenuItem = ({
	view,
	subpage,
	changePageHandler,
	icon,
	altMessage,
}) => {
	return (
		<li
			className={`${
				view === subpage ? "results__menu-item--selected" : "results__menu-item"
			}`}
			onClick={() => changePageHandler(subpage)}
		>
			<img src={icon} className="results__subMenu-icon" alt={altMessage} />
		</li>
	);
};

export default ResultsSubMenuItem;
