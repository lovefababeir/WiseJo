import React from "react";
import "./SearchForm.scss";
import { Spring } from "react-spring";
import SearchFormSpinner from "./SearchFormSpinner";

const SearchForm = ({ submitHandler, loading }) => {
	const inputRef = React.createRef();
	return (
		<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
			{props => (
				<div style={props}>
					<section className="search">
						<form action="submit" onSubmit={submitHandler}>
							<h1 className="form__title">SHOP & COMPARE</h1>
							<div className="form__box">
								<label className="form__label">Select a grocery store</label>
								<select name="groceryStore" id="storeList">
									<option value="Longo's">Longo's</option>
									<option value="No Frills">No Frills</option>
									<option value="Walmart">Walmart</option>
								</select>
								<label className="form__label">Search an item</label>
								<input
									type="text"
									id="search"
									ref={inputRef}
									autoComplete="off"
								></input>
								<button type="submit" id="submitBtn">
									search
								</button>
							</div>
						</form>
						{loading && <SearchFormSpinner />}
					</section>
				</div>
			)}
		</Spring>
	);
};
export default SearchForm;
