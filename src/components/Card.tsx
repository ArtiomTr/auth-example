import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import classes from '../styles/Card.module.scss';

export type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = ({ className, children, ...passedProps }: CardProps) => (
	<div className={clsx(className, classes['card'])} {...passedProps}>
		{children}
	</div>
);
