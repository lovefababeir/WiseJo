import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setMessage("");
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage("Check your inbox for further instruction");
		} catch {
			setError("Failed to reset password");
		}
		setLoading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="accountForms__title">Password Reset</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{message && <Alert variant="warning">{message}</Alert>}

					<Form onSubmit={handleSubmit} className="accountForms__form">
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>

						<Button disabled={loading} className="w-100" type="submit">
							Reset Password
						</Button>
					</Form>
					<div className="accountForms__loginLink">
						<Link to="/login">Log In</Link>
					</div>
					<div className="accountForms__loginLink">
						Need an account? <Link to="/signup">Sign Up</Link>
					</div>
				</Card.Body>
			</Card>
		</>
	);
};

export default ForgotPassword;
