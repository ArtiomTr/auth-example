import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import GithubIcon from '../assets/icons/logo-github.svg?component';
import classes from '../styles/Footer.module.scss';

export type FooterProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export const Footer = ({ className, ...passedProps }: FooterProps) => (
	<footer {...passedProps} className={clsx(classes['footer'], className)}>
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
);