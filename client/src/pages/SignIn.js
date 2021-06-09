// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase";
import * as firebaseui from "firebaseui";
import { Link, useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./Signin.scss";
import wiseJo from "../assets/images/WiseJo.png";
import { useAuth } from "../contexts/AuthContext";

// Configure FirebaseUI.
const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: "popup",

	// We will display Google and Facebook as auth providers.
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID,
		firebase.auth.PhoneAuthProvider.PROVIDER_ID,
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
			signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
		},
		firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
	],
};

function SignInScreen() {
	const { currentUser } = useAuth();
	const history = useHistory();
	const [logoDisplay, setLogoDisplay] = useState(true);

	useEffect(() => {
		let mounted = true;
		if (currentUser && mounted) {
			history.push("/");
		} else {
			setTimeout(() => setLogoDisplay(false), 7000);
		}
		return () => {
			mounted = false;
		};
	}, [currentUser, history]);

	return (
		<section className="signin">
			{logoDisplay && (
				<div className="signin__logo">
					<img src={wiseJo} alt="Wise Jo the sun logo"></img>
				</div>
			)}

			<Card className="signin__card">
				<Card.Body className="loginForm">
					<h1 className="signin__appName">WiseJo</h1>
					<p className="signin__text">Please sign-in:</p>
					<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
					<Link to="/forgot-password" className="signin__text">
						Forgot password?
					</Link>
					<div className="w-100 text-center mt-2 signin__text">
						Need an account?{" "}
						<Link to="/signup" className="signin__text">
							Sign Up
						</Link>
					</div>
				</Card.Body>
			</Card>
		</section>
	);
}

export default SignInScreen;
