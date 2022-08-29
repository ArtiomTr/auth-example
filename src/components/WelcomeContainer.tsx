import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import classes from '../styles/WelcomeContainer.module.scss';
import { Heading } from './Heading';

export type WelcomeContainerProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	'children'
>;

export const WelcomeContainer = ({
	className,
	...passedProps
}: WelcomeContainerProps) => (
	<section {...passedProps} className={clsx(classes['container'], className)}>
		<Heading className={classes['container__heading']} variant="h1" as="h2">
			Welcome back!
		</Heading>
		<p className={classes['container__text']}>
			We&apos;re happy to see you. Lorem ipsum dolor sit amet, consectetur
			adipiscing elit. Sed tristique ultrices eros non pretium.
			Suspendisse potenti. Vestibulum nibh elit, efficitur et porttitor
			ut, tempus quis magna.
		</p>
	</section>
);
