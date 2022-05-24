import React, { useState } from "react";
import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";
import { useCookies } from "react-cookie";
function Home() {
	const [showModal, setShowModal] = useState(false);
	const [isSignUp, setIsSignUp] = useState(true);
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);
	const authToken = cookies.AuthToken;

	const handleClick = () => {
		if (authToken) {
			removeCookie("UserId", cookies.UserId);
			removeCookie("AuthToken", cookies.AuthToken);
			window.location.reload();
			return;
		}
		setIsSignUp(true);
		setShowModal(true);
	};

	return (
		<div className="overlay">
			<Nav
				authToken={authToken}
				setShowModal={setShowModal}
				showModal={showModal}
				setIsSignUp={setIsSignUp}
			/>
			<div className="home">
				<h1 className="primary-title">Swipe right</h1>
				<button className="primary-button" onClick={handleClick}>
					{authToken ? "SignOut" : "Create account"}
				</button>
				{showModal && (
					<AuthModal
						setShowModal={setShowModal}
						isSignUp={isSignUp}
						setIsSignUp={setIsSignUp}
						authToken={false}
						minimal={true}
					/>
				)}
			</div>
		</div>
	);
}

export default Home;
