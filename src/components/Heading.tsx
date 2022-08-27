import { clsx } from 'clsx';
import { HTMLAttributes } from 'react';
import classes from '../styles/Heading.module.scss';

export type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export const Heading = ({ className, children, ...other }: HeadingProps) => (
	<h1 {...other} className={clsx(classes['heading'], className)}>
		{children}
	</h1>
);
