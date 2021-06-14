import React from "react";
import "./SearchForm.scss";

const SearchForm = ({ submitHandler, loading }) => {
	const inputRef = React.createRef();
	return (
		<>
			<form className="form" action="submit" onSubmit={submitHandler}>
				<div className="form__box">
					<label className="form__label">Select a grocery store</label>
					<select name="groceryStore" id="storeList" disabled={loading}>
						<option value="Longo's">Longo's</option>
						<option value="No Frills">No Frills</option>
						<option value="Sobeys">Sobeys</option>
						<option value="Walmart">Walmart</option>
					</select>
					<label className="form__label">Search an item</label>
					<input
						type="text"
						id="search"
						ref={inputRef}
						autoComplete="off"
						disabled={loading}
					></input>
					<button type="submit" id="submitBtn" disabled={loading}>
						search
					</button>
				</div>
			</form>
		</>
	);
};
export default SearchForm;
