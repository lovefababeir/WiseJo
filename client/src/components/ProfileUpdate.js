import React from "react";
import { Form, Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

const ProfileUpdate = ({ usernameRef, handleSubmit, username, edit }) => {
	return (
		<Collapse in={edit}>
			<Form
				onSubmit={handleSubmit}
				className="accountForms__form accountForms__form--profile"
				id="edit-users-profile"
			>
				<Form.Group id="edit__username">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						ref={usernameRef}
						required
						defaultValue={username}
					/>
				</Form.Group>
				<Button className="w-100" type="submit">
					Save
				</Button>
			</Form>
		</Collapse>
	);
};

export default ProfileUpdate;
