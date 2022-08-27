import clsx from 'clsx';
import { type InputHTMLAttributes, useId } from 'react';

import classes from '../styles/Input.module.scss';
import { usePrevious } from '../utils/usePrevious';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> & {
	label: React.ReactNode;
	helperText?: string;
	startAdornment?: React.ReactNode;
	endAdornment?: React.ReactNode;
	hasError?: boolean;
};

export const Input = ({
	label,
	helperText,
	id: propertyId,
	startAdornment,
	hasError,
	endAdornment,
	...other
}: InputProps) => {
	const id = useId();

	const previousHelperText = usePrevious(helperText);

	return (
		<div className={clsx(classes['field'], hasError && classes['field--error'])}>
			<div className={classes['field__area']}>
				{startAdornment && <div className={classes['field__start-adornment']}>{startAdornment}</div>}
				<input className={classes['field__input']} placeholder=" " {...other} id={propertyId ?? id} />
				<label className={classes['field__label']} htmlFor={propertyId ?? id}>
					{label}
				</label>
				{endAdornment && <div className={classes['field__end-adornment']}>{endAdornment}</div>}
			</div>
			<p className={clsx(classes['field__helper-text'], !helperText && classes['field__helper-text--empty'])}>
				{helperText || previousHelperText || 'empty'}
			</p>
		</div>
	);
};
