import React, { useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import "./Profile.scss";
import Collapse from "react-bootstrap/Collapse";
import ProfileUpdate from "../components/ProfileUpdate.js";
import ButtonDashboard from "../components/ButtonDashboard.js";

const EditProfile = () => {
	const usernameRef = useRef();
	const { currentUser } = useAuth();
	const [edit, setEdit] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		const newName = usernameRef.current.value;
		currentUser
			.updateProfile({
				displayName: newName,
			})
			.then(() => {
				setEdit(!edit);
			})
			.catch(error => {
				setErrorMsg(
					"Error: We're unable to update your profile name. Please try again later or contact the WiseJo admin.",
				);
				console.log(errorMsg);
			});
	}

	return (
		<section className="profile">
			<Card>
				<Card.Body>
					<h1 className="signin__appName">WiseJo</h1>
					<h2 className="accountForms__title">Profile</h2>
					<Collapse in={!edit}>
						<div className="profile__details" id="profile__details">
							<p className="profile__user">
								Name:{" "}
								<span>
									{currentUser.displayName || "Click Edit Profile to add your name"}
								</span>
							</p>
							<p className="profile__user">
								Email: <span>{currentUser.email || "You are signed in as Guest"}</span>
							</p>
						</div>
					</Collapse>
					{!edit && (
						<button
							onClick={() => {
								setEdit(!edit);
							}}
							aria-controls="edit-users-profile profile__details connect-form"
							aria-expanded={edit}
							className="editProfile__button"
						>
							Edit Profile
						</button>
					)}
					<ProfileUpdate
						usernameRef={usernameRef}
						handleSubmit={handleSubmit}
						username={currentUser.displayName}
						edit={edit}
					/>
					<ButtonDashboard />
				</Card.Body>
			</Card>
		</section>
	);
};

export default EditProfile;
