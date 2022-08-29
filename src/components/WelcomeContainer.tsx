import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import GithubIcon from '../assets/icons/logo-github.svg?component';
import Logo from '../assets/logo.svg?component';
import classes from '../styles/WelcomeContainer.module.scss';
import { Heading } from './Heading';
import { ThemeSwitch } from './ThemeSwitch';

export type WelcomeContainerProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	'children'
>;

export const WelcomeContainer = ({
	className,
	...passedProps
}: WelcomeContainerProps) => (
	<div
		{...passedProps}
		className={clsx(classes['welcome-container'], className)}
	>
		<header aria-label="App header" className={classes['header']}>
			<a
				href="https://github.com/ArtiomTr/auth-example#readme"
				target="_blank"
				rel="noreferrer"
				className={classes['brand']}
				tabIndex={-1}
			>
				<Logo className={classes['brand__logo']} />
				<span className={classes['brand__name']}>Dummy App</span>
			</a>
			<ThemeSwitch />
		</header>
		<section className={classes['content']}>
			<Heading
				className={classes['content__heading']}
				variant="h1"
				as="h2"
			>
				Welcome back!
			</Heading>
			<p>
				We&apos;re happy to see you. Please, enter your credentials to
				log into DummyApp.
			</p>
		</section>
		<footer className={classes['footer']}>
			<span className={classes['footer__copyright']}>
				Copyright © 2022 Dummy Inc. All rights reserved.
			</span>
			<a
				target="_blank"
				rel="noreferrer"
				href="https://github.com/ArtiomTr/auth-example#readme"
			>
				<GithubIcon className={classes['footer__github']} />
			</a>
		</footer>
	</div>
);
