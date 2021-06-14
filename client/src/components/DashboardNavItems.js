import React from "react";
import { useHistory } from "react-router-dom";

const DashboardNavItems = ({ page, text }) => {
	const history = useHistory();
	const pageHandler = page => {
		history.push(`/${page}`);
	};

	return (
		<button className="home__btn" onClick={() => pageHandler(`${page}`)}>
			{text}
		</button>
	);
};

export default DashboardNavItems;
