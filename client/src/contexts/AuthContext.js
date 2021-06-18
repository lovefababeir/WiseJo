import React, { useContext, useEffect, useState } from "react";
import firebase from "../firebase";
const AuthContext = React.createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState("");
	const [loading, setLoading] = useState(true);

	//function that executes logout
	const logout = () => {
		return firebase.auth().signOut();
	};

	function signup(email, password) {
		return firebase.auth().createUserWithEmailAndPassword(email, password);
	}

	function login(email, password) {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	function resetPassword(email) {
		return firebase.auth().sendPasswordResetEmail(email);
	}

	//update current user variable one the user signs in
	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	//Function to create token for access to the database
	const createToken = async () => {
		const token = await currentUser.getIdToken();
		const payloadHeader = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		return payloadHeader;
	};

	const value = {
		currentUser,
		logout,
		createToken,
		signup,
		login,
		resetPassword,
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
