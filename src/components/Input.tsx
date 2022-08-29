import clsx from 'clsx';
import { type InputHTMLAttributes, useId } from 'react';

import classes from '../styles/Input.module.scss';

export type InputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'placeholder'
> & {
	label: React.ReactNode;
	error?: string;
	startAdornment?: React.ReactNode;
	endAdornment?: React.ReactNode;
};

export const Input = ({
	label,
	error,
	id: propertyId,
	startAdornment,
	endAdornment,
	...other
}: InputProps) => {
	const labelId = useId();
	const errorElementId = useId();

	const hasError = Boolean(error);

	return (
		<div
			className={clsx(
				classes['field'],
				hasError && classes['field--error'],
			)}
		>
			<div className={classes['field__area']}>
				{startAdornment && (
					<div className={classes['field__start-adornment']}>
						{startAdornment}
					</div>
				)}
				<input
					aria-invalid={hasError}
					aria-errormessage={errorElementId}
					className={classes['field__input']}
					placeholder=" "
					{...other}
					id={propertyId ?? labelId}
				/>
				<label
					className={classes['field__label']}
					htmlFor={propertyId ?? labelId}
				>
					{label}
				</label>
				{endAdornment && (
					<div className={classes['field__end-adornment']}>
						{endAdornment}
					</div>
				)}
			</div>
			<div
				id={errorElementId}
				aria-live={hasError ? 'polite' : 'off'}
				className={classes['field__helper-text']}
			>
				{error || ' '}
			</div>
		</div>
	);
};
