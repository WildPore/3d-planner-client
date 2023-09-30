import React, { createContext, useState } from 'react';

interface UserSetttings {
	username: string;
	email?: string;
}

interface UserSettingsContextType {}

interface ProviderProps {
	children: React.ReactNode;
}

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(
	undefined
);

export default function UserSettingsProvider({ children }: ProviderProps) {
	const [settings, setSettings] = useState<UserSetttings>({ username: '' });

	const updateSettings = (newSettings: UserSetttings) => {
		setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
	};

	return (
		<UserSettingsContext.Provider value={{ settings, updateSettings }}>
			{children}
		</UserSettingsContext.Provider>
	);
}
