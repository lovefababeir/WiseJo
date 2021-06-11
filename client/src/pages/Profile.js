import React, { useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import ContactForm from "../components/ProfileContactForm";
import "./Profile.scss";
import Collapse from "react-bootstrap/Collapse";

const EditProfile = () => {
	const usernameRef = useRef();
	const { currentUser } = useAuth();
	const [edit, setEdit] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setEdit(!edit);
	}
	return (
		<section className="profile">
			{" "}
			<Card>
				<Card.Body>
					<h1 className="signin__appName">WiseJo</h1>
					<h2 className="accountForms__title">Profile</h2>

					<Collapse in={!edit}>
						<div class="profile__details" id="profile__details">
							<p className="profile__user">
								Username: <span>{currentUser.displayName}</span>
							</p>
							<p className="profile__user">
								Email: <span>{currentUser.email}</span>
							</p>
						</div>
					</Collapse>
					{!edit && (
						<p
							onClick={() => {
								setEdit(!edit);
							}}
							aria-controls="edit-users-profile profile__details connect-form"
							aria-expanded={edit}
							className="editProfile__button"
						>
							Edit Profile
						</p>
					)}
					<Collapse in={edit}>
						<Form
							onSubmit={handleSubmit}
							className="accountForms__form"
							id="edit-users-profile"
						>
							<Form.Group id="edit__username">
								<Form.Label>Username</Form.Label>
								<Form.Control
									type="text"
									ref={usernameRef}
									required
									defaultValue={currentUser.displayName}
								/>
							</Form.Group>

							<Button className="w-100" type="submit">
								Save
							</Button>
						</Form>
					</Collapse>
					<Collapse in={!edit}>
						<div
							id="connect-form"
							style={{
								width: "100%",
							}}
						>
							<ContactForm currentUser={currentUser} />
						</div>
					</Collapse>
				</Card.Body>
			</Card>
		</section>
	);
};

export default EditProfile;
