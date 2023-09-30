import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'primary' | 'secondary' | 'tertiary';
	className?: string;
}

const baseStyles =
	'px-4 py-2 rounded focus:outline-none transition duration-150';

const variants = {
	primary: 'bg-blue-500 hover:bg-blue-600 text-white',
	secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
	tertiary: 'bg-transparent hover:bg-gray-100 text-black',
};

export default function Button({
	children,
	variant = 'primary',
	className,
	...delegated
}: ButtonProps) {
	return (
		<button
			className={`${baseStyles} ${variants[variant]} ${className}`}
			{...delegated}
		>
			{children}
		</button>
	);
}
