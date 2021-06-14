import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./About.scss";
import ButtonDashboard from "../components/ButtonDashboard";
import AboutShop from "../components/AboutShop";
import AboutCompare from "../components/AboutCompare";
import AboutSnap from "../components/AboutSnap";
import AboutTrack from "../components/AboutTrack";

const About = () => {
	const [open, setOpen] = useState("");

	return (
		<section className="wisejo">
			<h1 className="signin__appName">WiseJo</h1>
			<p className="wisejo__about">
				WiseJo is an application designed to help users make smart choices when
				shopping at the grocery store and to help them track their expenses.
			</p>
			<AboutShop open={open} setOpen={setOpen} />
			<AboutCompare open={open} setOpen={setOpen} />
			<AboutSnap open={open} setOpen={setOpen} />
			<AboutTrack open={open} setOpen={setOpen} />
			<h4 className="wisejo__message">Any questions or concerns?</h4>
			<p>
				On the dashboard you'll find the option{" "}
				<Link to="/contact-wisejo" className="link-to-page">
					Contact WiseJo
				</Link>
				. Submit your questions or concerns and the WiseJo Admin will get back to
				you as soon as possible.
			</p>
			<ButtonDashboard />
		</section>
	);
};

export default About;
