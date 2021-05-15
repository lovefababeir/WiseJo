import React from "react";
import scale from "../assets/images/scale.svg";
import store from "../assets/images/store.svg";
import sun from "../assets/images/WiseJo.png";

const ResultsSubMenu = ({ changePageHandler, view }) => {
	return (
		<nav className="results__nav">
			<ul className="results__menu">
				<li
					className={`${
						view === "All" ? "results__menu-item--selected" : "results__menu-item"
					}`}
					onClick={() => changePageHandler("All")}
				>
					<img src={store} className="results__store" alt="view by store" />
				</li>
				<li
					className={`${
						view === "Capacity"
							? "results__menu-item--selected"
							: "results__menu-item"
					}`}
					onClick={() => changePageHandler("Capacity")}
				>
					<img src={scale} className="results__store" alt="view by capacity" />
				</li>
				<li
					className={`${
						view === "Solutions"
							? "results__menu-item--selected"
							: "results__menu-item"
					}`}
					onClick={() => changePageHandler("Solutions")}
				>
					<img src={sun} className="results__store" alt="view WiseJo's advice" />
				</li>
			</ul>
		</nav>
	);
};

export default ResultsSubMenu;
