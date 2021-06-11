import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import ContactForm from "../components/ProfileContactForm";
import "./Profile.scss";

const EditProfile = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser } = useAuth();
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [edit, setEdit] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
	}
	console.log(currentUser);
	return (
		<section className="profile">
			{" "}
			<Card>
				<Card.Body>
					<h1 className="signin__appName">WiseJo</h1>
					<h2 className="accountForms__title">Profile</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{message && <Alert variant="warning">{message}</Alert>}
					<div class="profile__details">
						<p className="profile__user">
							Username: <span>{currentUser.displayName}</span>
						</p>
						<p className="profile__user">
							Email: <span>{currentUser.email}</span>
						</p>
					</div>
					{edit && (
						<Form onSubmit={handleSubmit} className="accountForms__form">
							<Form.Group id="email">
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" ref={emailRef} required />
							</Form.Group>
							<Form.Group id="password">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" ref={passwordRef} required />
							</Form.Group>
							<Form.Group id="password-confirm">
								<Form.Label>Password Confirmation</Form.Label>
								<Form.Control type="password" ref={passwordConfirmRef} required />
							</Form.Group>
							<Button disabled={loading} className="w-100" type="submit">
								Sign Up
							</Button>
						</Form>
					)}
					<ContactForm currentUser={currentUser} />
				</Card.Body>
			</Card>
		</section>
	);
};

export default EditProfile;
