import axios from "axios";
import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";
import { useCookies } from "react-cookie";

function Dashboard() {
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);
	const [user, setUser] = useState(null);
	const [genderedUsers, setGenderedUsers] = useState(null);
	const userId = cookies.UserId;

	const updatedMatches = async (matchedUserId) => {
		try {
			await axios.put("http://localhost:8000/addmatch", {
				userId,
				matchedUserId,
			});
			console.log("wrzucam do bazy osobe");
			getUser();
		} catch (err) {
			console.log(err);
		}
	};

	const getUser = async () => {
		try {
			const response = await axios.get("http://localhost:8000/user", {
				params: { userId },
			});
			console.log("pobieram nowe dane dot matches");
			setUser(response.data);
		} catch (err) {
			console.log(err);
		}
	};
	const getGenderedUsers = async () => {
		try {
			const response = await axios.get("http://localhost:8000/gendered-users", {
				params: { gender: user?.gender_interest },
			});

			setGenderedUsers(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
		getGenderedUsers();
	}, []);
	const characters = [];
	const [lastDirection, setLastDirection] = useState();

	const swiped = (direction, swipedUserId) => {
		if (direction === "right") {
			updatedMatches(swipedUserId);
		}
		setLastDirection(direction);
	};

	const outOfFrame = (name) => {
		console.log(name + " left the screen!");
	};
	const matchedUserIds = user?.matches
		.map(({ user_id }) => user_id)
		.concat(userId);
	const filteredGenderedUsers = genderedUsers?.filter(
		(genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
	);
	return user && genderedUsers ? (
		<div className="dashboard">
			<ChatContainer user={user} />
			<div className="swipe-container">
				<div className="cardContainer">
					{filteredGenderedUsers.map((character, _index) => (
						<TinderCard
							className="swipe"
							key={_index}
							onSwipe={(dir) => swiped(dir, character.user_id)}
							onCardLeftScreen={() => outOfFrame(character.first_name)}
						>
							<div
								style={{ backgroundImage: "url(" + character.url + ")" }}
								className="card"
							>
								<h3 style={{ zIndex: 1 }}>{character.first_name}</h3>
							</div>
						</TinderCard>
					))}
					<div className="swipe-info">
						{lastDirection && <p>You swiped {lastDirection}</p>}
					</div>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
}

export default Dashboard;
