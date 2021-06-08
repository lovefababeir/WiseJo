import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link } from "react-router-dom";
import "./SignUp.scss";

const SignUp = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}
		try {
			setError("");
			setLoading(true);
			setMessage("");
			await signup(emailRef.current.value, passwordRef.current.value);
			setMessage(
				"Yay, you've signed up! You've been sent an verfication email. Make sure to verify your email.",
			);
		} catch {
			setError("Failed to create an account");
		}

		setLoading(false);
	}

	return (
		<>
			{" "}
			<Card>
				<Card.Body>
					<h1 className="signin__appName">WiseJo</h1>
					<h2 className="accountForms__title">Sign Up</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{message && <Alert variant="warning">{message}</Alert>}
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
					<div className="accountForms__loginLink">
						Already have an account? <Link to="/login">Log In</Link>
					</div>
				</Card.Body>
			</Card>
		</>
	);
};

export default SignUp;
