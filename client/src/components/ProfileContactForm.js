import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Link } from "react-router-dom";
import "./ProfileContactForm.scss";
import goback from "../assets/images/arrow.svg";

const ContactForm = ({ currentUser }) => {
	const [state, handleSubmit] = useForm("xayajwyp");
	if (state.succeeded) {
		return <p>Message sent! We'll get back to you as soon as possible.</p>;
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="connect-form">
				<h2 className="connect-form__title">Need help? Contact Us</h2>
				<label htmlFor="email" className="connect-form__label">
					Email Address:
				</label>
				<input
					id="email"
					type="email"
					name="email"
					defaultValue={currentUser.email}
					className="connect-form__textbox"
					disabled={currentUser}
				/>
				<ValidationError prefix="Email" field="email" errors={state.errors} />
				<label htmlFor="email" className="connect-form__label">
					Message:
				</label>
				<textarea
					id="message"
					name="message"
					className="connect-form__textbox connect-form__textbox--2"
				/>

				<ValidationError prefix="Message" field="message" errors={state.errors} />
				<button
					type="submit"
					disabled={state.submitting}
					className="connect-form__button"
				>
					Submit
				</button>
			</form>
			<Link to="/" className="back-to-dashboard">
				<img src={goback} alt="Click here to go back to the dashboard" />
				Back to Dashboard
			</Link>
		</>
	);
};
export default ContactForm;
