import clsx from 'clsx';
import { createElement, HTMLAttributes, ReactHTML } from 'react';
import classes from '../styles/Card.module.scss';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
	as?: keyof ReactHTML;
};

export const Card = ({ className, children, as = 'div', ...passedProps }: CardProps) => {
	return createElement(
		as,
		{
			...passedProps,
			className: clsx(className, classes['card']),
		},
		children,
	);
};
