import React, { useContext, useEffect, useState } from "react";
import firebase from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState("");
	const [loading, setLoading] = useState(true);

	const logout = () => {
		return firebase.auth().signOut();
	};

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = { currentUser, logout };
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
