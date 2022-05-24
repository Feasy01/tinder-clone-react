import axios from "axios";
import React from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import { useState, useEffect } from "react";
function ChatDisplay({ user, clickedUser }) {
	const userId = user?.user_id;
	const clickedUserId = clickedUser?.user_id;
	const [usersMessages, setUsersMessages] = useState(null);
	const [clickedUsersMessages, setClickedUsersMessages] = useState(null);
	const getUsersMessages = async () => {
		try {
			const response = await axios.get("http://localhost:8000/messages", {
				params: { userId: userId, correspondingUserId: clickedUserId },
			});
			setUsersMessages(response.data);
		} catch (err) {
			console.log(err);
		}
	};
	const getClickedMessages = async () => {
		try {
			const response = await axios.get("http://localhost:8000/messages", {
				params: { userId: clickedUserId, correspondingUserId: userId },
			});
			setClickedUsersMessages(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUsersMessages();
		getClickedMessages();
	}, []);
	const messages = [];

	usersMessages?.forEach((message) => {
		const formattedMessage = {};
		formattedMessage["name"] = user?.first_name;
		formattedMessage["image"] = user?.url;
		formattedMessage["message"] = message.message;
		formattedMessage["timestamp"] = message.timestamp;
		messages.push(formattedMessage);
	});
	clickedUsersMessages?.forEach((message) => {
		const formattedMessage = {};
		formattedMessage["name"] = clickedUser?.first_name;
		formattedMessage["image"] = clickedUser?.url;
		formattedMessage["message"] = message.message;
		formattedMessage["timestamp"] = message.timestamp;
		messages.push(formattedMessage);
	});

	const descendingOrderMessages = messages?.sort((a, b) =>
		a.timestamp.localeCompare(b.timestamp)
	);

	return (
		<div>
			<Chat descendingOrderMessages={descendingOrderMessages} />
			<ChatInput
				user={user}
				clickedUser={clickedUser}
				getUsersMessages={getUsersMessages}
				getClickedMessages={getClickedMessages}
			/>
		</div>
	);
}

export default ChatDisplay;
