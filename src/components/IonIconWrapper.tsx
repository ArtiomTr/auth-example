import clsx from 'clsx';
import { SVGProps, PropsWithChildren } from 'react';
import classes from '../styles/IonIconWrapper.module.scss';

export type IonIconProps = Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox' | 'children'>;

/**
 * React component. Common wrapper for all IonIcons.
 */
export const IonIconWrapper = ({ children, className, ...other }: PropsWithChildren<IonIconProps>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		className={clsx(classes['ionicon'], className)}
		{...other}
	>
		{children}
	</svg>
);
