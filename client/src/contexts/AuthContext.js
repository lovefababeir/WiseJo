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

	console.log("current user", currentUser);
	const value = { currentUser, logout, createToken };
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
