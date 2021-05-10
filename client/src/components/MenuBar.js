import React from "react";
import "./MenuBar.scss";
import { NavLink } from "react-router-dom";
import receipt from "../assets/images/receipt.svg";
import camera from "../assets/images/camera.svg";
import search from "../assets/images/shoppingCart.svg";
import compare from "../assets/images/tags.svg";

const MenuBar = () => {
	return (
		<nav>
			<ul className="menu">
				<li>
					<NavLink
						to="/shop"
						className="menu__item"
						activeClassName="menu-item--selected"
					>
						<img
							src={search}
							className="menu__icon"
							// onClick={() => this.pageHandler("main")}
							alt="Click here to search the prices of a specific item"
						/>
						<h4 className="menu__label">shop</h4>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/results"
						className="menu__item"
						activeClassName="menu-item--selected"
					>
						<img
							src={compare}
							className="menu__icon"
							// onClick={() => this.pageHandler("results")}
							alt="Click here to show the results of your most recent search and compare the prices from different locations and sizes"
						/>
					</NavLink>
					<h4 className="menu__label">compare</h4>
				</li>
				<li>
					<NavLink
						exact
						to="/receipt"
						className="menu__item"
						activeClassName="menu-item--selected"
					>
						<img
							src={camera}
							className="menu__icon menu__icon--3"
							// onClick={() => this.pageHandler("receipt")}
							alt="Click here to add a new receipt"
						/>
					</NavLink>
					<h4 className="menu__label">snap</h4>
				</li>
				<li>
					<NavLink to="/receiptslist" activeClassName="menu-item--selected">
						<img
							src={receipt}
							className="menu__icon menu__icon--4"
							// onClick={() => this.pageHandler("receiptslist")}
							alt="Click here to check the history of your previous purchases"
						/>
					</NavLink>

					<h4 className="menu__label">track</h4>
				</li>
			</ul>
		</nav>
	);
};

export default MenuBar;
