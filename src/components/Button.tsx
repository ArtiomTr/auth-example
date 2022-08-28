import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import classes from '../styles/Button.module.scss';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isLoading?: boolean;
};

export const Button = ({
	isLoading,
	children,
	className,
	...passedProps
}: ButtonProps) => (
	<button
		{...passedProps}
		className={clsx(
			classes['button'],
			isLoading && classes['button--loading'],
			className,
		)}
	>
		{children}
	</button>
);
