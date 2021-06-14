import React, { useState } from "react";
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
			<p>Go to your profile and complete the form to contact the WiseJo admin.</p>
			<ButtonDashboard />
		</section>
	);
};

export default About;
