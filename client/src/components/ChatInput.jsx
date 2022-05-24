import React from "react";
import axios from "axios";
import { useState } from "react";
function ChatInput({
	user,
	clickedUser,
	getUsersMessages,
	getClickedMessages,
}) {
	const [textArea, setTextArea] = useState(null);
	const userId = user?.user_id;
	const clickedUserId = clickedUser?.user_id;
	const addMessage = async () => {
		const messages = {
			timestamp: new Date().toISOString(),
			from_userId: userId,
			to_userId: clickedUserId,
			message: textArea,
		};
		console.log(messages);
		try {
			await axios.post("http://localhost:8000/message", { messages });
			getUsersMessages();
			getClickedMessages();
			setTextArea("");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div
			className="chat-input"
			value={textArea}
			onChange={(e) => {
				setTextArea(e.target.value);
			}}
		>
			<textarea />
			<button className="secondary-button" onClick={addMessage}>
				send
			</button>
		</div>
	);
}

export default ChatInput;
