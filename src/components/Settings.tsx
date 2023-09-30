import Button from './Button';

interface SettingsProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Renders a settings component.
 *
 * @returns {JSX.Element} The rendered settings component.
 */
export default function Settings({ isOpen, setIsOpen }: SettingsProps) {
	const handleOpenModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<Button variant={'primary'} onClick={handleOpenModal}>
				Settings
			</Button>
		</>
	);
}
