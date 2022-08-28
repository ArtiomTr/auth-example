import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import classes from '../styles/IconButton.module.scss';

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({
	className,
	children,
	type = 'button',
	...passedProps
}: IconButtonProps) => (
	<button
		{...passedProps}
		type={type}
		className={clsx(className, classes['icon-button'])}
	>
		{children}
	</button>
);
