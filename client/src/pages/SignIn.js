// Import FirebaseAuth and firebase.
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase";
import { Link } from "react-router-dom";
import { Card, Form, Alert } from "react-bootstrap";

// Configure FirebaseUI.
const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: "popup",
	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: "/",
	// We will display Google and Facebook as auth providers.
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		firebase.auth.TwitterAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.PhoneAuthProvider.PROVIDER_ID,
	],
};

function SignInScreen() {
	return (
		<div>
			<Card>
				<Card.Body>
					<h1>My App</h1>
					<p>Please sign-in:</p>
					<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
					<Link to="/forgot-password">Forgot password?</Link>
					<div className="w-100 text-center mt-2">
						Need an account? <Link to="/signup">Sign Up</Link>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
}

export default SignInScreen;
