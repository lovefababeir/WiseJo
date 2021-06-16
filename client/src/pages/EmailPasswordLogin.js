import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useHistory } from "react-router-dom";

const EmailPasswordLogin = ({ emailPassword }) => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			history.push("/");
		} catch {
			setError("Failed to log in");
			console.log(error);
		}

		setLoading(false);
	}

	return (
		<>
			<Collapse in={emailPassword}>
				<div id="emailPassword">
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Button disabled={loading} className="w-100" type="submit">
							Log In
						</Button>
					</Form>
					<Link to="/forgot-password" className="signin__text link-to-page">
						Forgot password?
					</Link>
					<div className="w-100 text-center mt-2 signin__text">
						Need an account?{" "}
						<Link to="/signup" className="signin__text link-to-page">
							Sign Up
						</Link>
					</div>
				</div>
			</Collapse>
		</>
	);
};

export default EmailPasswordLogin;
