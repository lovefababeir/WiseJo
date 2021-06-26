import React from "react";
import "./MenuBar.scss";
import receipt from "../assets/images/receipt.svg";
import camera from "../assets/images/camera.svg";
import search from "../assets/images/shoppingCart.svg";
import compare from "../assets/images/tags.svg";
import home from "../assets/images/home.svg";
import MenuBarItem from "./MenuBarItem";

const MenuBar = () => {
	return (
		<nav className="menu-bar">
			<ul className="menu">
				<MenuBarItem
					img={search}
					description="Click here to search the prices of a specific item"
					page={"shop"}
				/>
				<MenuBarItem
					img={compare}
					description="Click here to show the results of your most recent search and compare the prices from different locations and sizes"
					page={"compare"}
				/>
				<MenuBarItem
					img={home}
					description="Click here to go back to the home page."
					page={"home"}
				/>
				<MenuBarItem
					img={camera}
					description="Click here to add a new receipt"
					page={"snap"}
				/>
				<MenuBarItem
					img={receipt}
					description="Click here to add a new receipt"
					page={"track"}
				/>
			</ul>
		</nav>
	);
};

export default MenuBar;
