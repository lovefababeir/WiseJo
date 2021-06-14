import React, { useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import ContactForm from "../components/ProfileContactForm";
import "./Profile.scss";

const ContactWiseJo = () => {
	const usernameRef = useRef();
	const { currentUser } = useAuth();
	const [edit, setEdit] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	return (
		<section className="profile">
			<Card>
				<Card.Body>
					<h1 className="signin__appName">WiseJo</h1>
					<h2 className="accountForms__title">Profile</h2>
					<ContactForm currentUser={currentUser} edit={edit} />
				</Card.Body>
			</Card>
		</section>
	);
};

export default ContactWiseJo;
