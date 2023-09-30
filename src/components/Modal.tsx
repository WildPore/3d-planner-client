import React from 'react';

import Button from './Button';

interface ModalProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}

/**
 * Renders a modal component.
 *
 * @param {boolean} isOpen - Indicates whether the modal is open or not.
 * @param {function} setIsOpen - Callback function to set the modal open state.
 * @param {ReactNode} children - The content to be rendered inside the modal.
 * @return {JSX.Element} The modal component.
 */
export default function Modal({ isOpen, setIsOpen, children }: ModalProps) {
	const handleClose = () => {
		setIsOpen(false);
	};

	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			setIsOpen(false);
		}
	};

	return (
		<>
			{isOpen && (
				<div
					className='fixed w-full h-full flex justify-center items-center bg-black bg-opacity-25'
					onClick={handleOverlayClick}
				>
					<div className='bg-gray-800 fixed p-8 w-4/5 h-4/5 flex justify-center items-center rounded-lg'>
						<Button
							variant='secondary'
							className='self-start'
							onClick={handleClose}
						>
							Close
						</Button>
						{children}
					</div>
				</div>
			)}
		</>
	);
}
