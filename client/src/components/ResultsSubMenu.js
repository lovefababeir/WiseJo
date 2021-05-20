import React from "react";
import scale from "../assets/images/scale.svg";
import store from "../assets/images/store.svg";
import wisejo from "../assets/images/WiseJo.png";
import ResultsSubMenuItem from "./ResultsSubMenuItem";
import { v4 as uuidv4 } from "uuid";

const ResultsSubMenu = ({ changePageHandler, view }) => {
	const subMenuItems = [
		{ subpage: "All", icon: store, altMessage: "View results by store" },
		{ subpage: "Capacity", icon: scale, altMessage: "View results by capacity" },
		{ subpage: "Solutions", icon: wisejo, altMessage: "view WiseJo's advice" },
	];

	return (
		<nav className="results__nav">
			<ul className="results__menu">
				{subMenuItems.map(item => (
					<ResultsSubMenuItem
						view={view}
						subpage={item.subpage}
						changePageHandler={changePageHandler}
						icon={item.icon}
						key={uuidv4()}
					/>
				))}
			</ul>
		</nav>
	);
};

export default ResultsSubMenu;
