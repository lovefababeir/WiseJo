import React from "react";
import { NavLink } from "react-router-dom";

const MenuBarItem = ({ img, description, page }) => {
	return (
		<li>
			<NavLink
				to={`/${page === "home" ? "" : page}`}
				exact
				className="menu__item"
				activeClassName="menu-item--selected"
			>
				<img
					src={img}
					className={`menu__icon menu__icon--${page}`}
					alt={description}
				/>
				<h4 className="menu__label">{page}</h4>
			</NavLink>
		</li>
	);
};

export default MenuBarItem;
