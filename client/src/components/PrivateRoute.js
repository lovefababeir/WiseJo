import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { currentUser } = useAuth();
	return (
		<Route
			{...rest}
			render={props => {
				return currentUser ? (
					<section className="main-page">
						<Component {...props} />
					</section>
				) : (
					<Redirect to="/login"></Redirect>
				);
			}}
		></Route>
	);
};

export default PrivateRoute;
