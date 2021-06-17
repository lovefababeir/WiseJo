import React from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import ContactForm from "../components/ContactForm";
import "./Profile.scss";

const ContactWiseJo = () => {
	const { currentUser } = useAuth();

	return (
		<section className="profile">
			<Card>
				<Card.Body>
					<h1 className="signin__appName">WiseJo</h1>
					<h2 className="accountForms__title">Profile</h2>
					<ContactForm currentUser={currentUser} />
				</Card.Body>
			</Card>
		</section>
	);
};

export default ContactWiseJo;
