import React from "react";
import logo from "../images/tinder_logo_white.png";
import logo2 from "../images/color-logo-tinder.png";

function Nav({ setShowModal, showModal, setIsSignUp, authToken, minimal }) {
	const handleClick = () => {
		setShowModal(true);
		setIsSignUp(false);
	};

	return (
		<nav>
			<div className="logo-container">
				<img className="logo" src={minimal ? logo : logo2}></img>
			</div>
			{!authToken && (
				<button
					className="nav-button"
					onClick={handleClick}
					disabled={showModal}
				>
					{" "}
					Log in
				</button>
			)}
		</nav>
	);
}

export default Nav;
