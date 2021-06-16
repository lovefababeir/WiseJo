// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase";
import * as firebaseui from "firebaseui";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./Signin.scss";
import wiseJo from "../assets/images/WiseJo.png";
import { useAuth } from "../contexts/AuthContext";
import Collapse from "react-bootstrap/Collapse";
import EmailPasswordLogin from "./EmailPasswordLogin";

// Configure FirebaseUI.
const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: "popup",

	// We will display Google and Facebook as auth providers.
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID,
		firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
	],
};

function SignInScreen() {
	const { currentUser } = useAuth();
	const history = useHistory();
	const [logoDisplay, setLogoDisplay] = useState(true);
	const [emailPassword, setEmailPassword] = useState(false);
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
					<Collapse in={!emailPassword}>
						<div id="OAuthSignIn">
							<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
						</div>
					</Collapse>
					<button
						onClick={() => {
							setEmailPassword(!emailPassword);
						}}
						aria-controls="OAuthSignIn emailPassword"
						aria-expanded={emailPassword}
						className="emailPassword__button"
					>
						{!emailPassword ? "Sign in with Account" : "Sign with Third Party"}
					</button>
					<EmailPasswordLogin emailPassword={emailPassword} />
				</Card.Body>
			</Card>
		</section>
	);
}

export default SignInScreen;
