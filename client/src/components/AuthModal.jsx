import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function AuthModal({ setShowModal, setIsSignUp, isSignUp }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState(null);
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);
	let navigate = useNavigate();
	const handleClick = () => {
		setShowModal(false);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (isSignUp && password !== confirmPassword) {
				setError("Passwords need to match");
				return;
			}
			const response = await axios.post(
				`http://localhost:8000/${isSignUp ? "signup" : "login"}`,
				{
					email,
					password,
				}
			);
			setCookie("AuthToken", response.data.token);
			setCookie("UserId", response.data.userId);
			const success = response.status === 201;

			if (success && isSignUp) navigate("/onboarding");
			if (success && !isSignUp) navigate("/dashboard");
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="auth-modal">
			<div className="close-icon">
				<span onClick={handleClick}>X</span>
				<h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
				<p>
					By clicking log in you agree to our terms. Learn how we process your
					data in our Privacy
				</p>
				<form onSubmit={handleSubmit}>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="email"
						required={true}
						onChange={(e) => setEmail(e.target.value)}
					></input>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="password"
						required={true}
						onChange={(e) => setPassword(e.target.value)}
					></input>
					{isSignUp && (
						<input
							type="password"
							id="password-check"
							name="password-check"
							placeholder="Confirm Password"
							required={true}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></input>
					)}
					<input type="submit" className="secondary-button"></input>
					<p>{error}</p>
				</form>
			</div>
			<hr />
			<h2>GET THE APP</h2>
		</div>
	);
}

export default AuthModal;
