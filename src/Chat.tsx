import React, { useState } from 'react';
import socket from './socket';
import { useChat } from './useChat';
import { useUserSettings } from './useUserSettings';

interface ChatMessage {
	user: string;
	message: string;
}

export default function Chat() {
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState('');
	const { messages, addMessage } = useChat();
	const { settings } = useUserSettings();

	socket.on('chat-message', (data: ChatMessage) => {
		addMessage(data);
	});

	const sendMessage = () => {
		const chatMessage = { user: settings.username, message };
		socket.emit('chat-message', chatMessage);
		addMessage(chatMessage);
		setMessage('');
	};

	return (
		<div className='fixed bottom-4 right-4 '>
			<div className='flex-row justify-end items-end'>
				{isOpen && (
					<div className='relative p-4 rounded shadow-md'>
						<div>
							{messages.map((msg, idx) => (
								<div key={idx}>
									<strong>{msg.user}:</strong> {msg.message}
								</div>
							))}
						</div>

						<div className='flex gap-2'>
							<input
								type='text'
								placeholder='Name'
								value={user}
								onChange={(e) => setUser(e.target.value)}
							/>
							<input
								type='text'
								placeholder='Message'
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
							<button
								className='bg-white text-black p-1 rounded'
								onClick={sendMessage}
							>
								Send
							</button>
						</div>
					</div>
				)}
				<button
					className='bg-white p-1.5 rounded-lg self-end text-black'
					onClick={() => setIsOpen(!isOpen)}
				>
					Toggle Chat
				</button>
			</div>
		</div>
	);
}
