import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
function MatchesDisplay({ matches, setClickedUser }) {
	const [matchedProfiles, setMatchedProfiles] = useState(null);

	const matchedUsersIds = matches.map(({ user_id }) => user_id);
	const getMatches = async () => {
		try {
			const response = await axios.get("/users", {
				params: { userIds: JSON.stringify(matchedUsersIds) },
			});
			setMatchedProfiles(response.data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getMatches();
	}, [matches]);

	return (
		<>
			<div className="matches-display">
				{matchedProfiles?.map((match, _index) => (
					<div
						key={_index}
						className="match-card"
						onClick={() => setClickedUser(match)}
					>
						<div className="img-container">
							<img src={match?.url} alt={match?.first_name + "profile"} />
						</div>
						<h3>{match?.first_name}</h3>
					</div>
				))}
			</div>
		</>
	);
}

export default MatchesDisplay;
