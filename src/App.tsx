import React from 'react';
import './App.css';

import ChatProvider from './ChatContext';

import Chat from './Chat';
import Settings from './components/Settings';
import CubeMover from './CubeMover';
import Modal from './components/Modal';

function App() {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div className='w-full h-full'>
			{isOpen && (
				// <div className={overlayStyle}>
				// 	<div className={modalStyle}>
				// 	</div>
				// </div>
				<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
					<h2>Settings</h2>
					<p>Modal content goes here.</p>
				</Modal>
			)}

			<div className='relative top-2 left-2 z-0'>
				<Settings isOpen={isOpen} setIsOpen={setIsOpen} />
				<div className='App'>
					<header className='header'>
						<CubeMover />
					</header>
				</div>
			</div>
		</div>
	);
}

export default App;
