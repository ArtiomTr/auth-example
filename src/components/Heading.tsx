import { clsx } from 'clsx';
import { createElement } from 'react';
import { HTMLAttributes, ReactHTML } from 'react';
import classes from '../styles/Heading.module.scss';

export type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
	variant?: HeadingVariant;
	as?: keyof ReactHTML;
};

export const Heading = ({
	className,
	variant = 'h1',
	as: HeadingComponent = variant,
	children,
	...passedProps
}: HeadingProps) => {
	return createElement(
		HeadingComponent,
		{
			...passedProps,
			className: clsx(
				classes['heading'],
				classes[`heading--${variant}`],
				className,
			),
		},
		children,
	);
};
