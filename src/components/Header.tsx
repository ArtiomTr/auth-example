import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import Logo from '../assets/logo.svg?component';
import classes from '../styles/Header.module.scss';
import { ThemeSwitch } from './ThemeSwitch';

export type HeaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export const Header = ({ className, ...passedProps }: HeaderProps) => (
	<header
		aria-label="App header"
		{...passedProps}
		className={clsx(classes['header'], className)}
	>
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
);
