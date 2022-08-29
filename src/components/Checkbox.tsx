import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import CheckmarkIcon from '../assets/icons/checkmark-outline.svg?component';
import classes from '../styles/Checkbox.module.scss';

export type CheckboxProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'children' | 'type'
> & {
	label: React.ReactNode;
};

export const Checkbox = ({
	className,
	checked,
	label,
	...passedProps
}: CheckboxProps) => (
	<label
		className={clsx(
			classes['checkbox'],
			checked && classes['checkbox--checked'],
			className,
		)}
	>
		<input
			{...passedProps}
			type="checkbox"
			checked={checked}
			className={classes['checkbox__input']}
		/>
		<div className={classes['checkbox__control']}>
			<CheckmarkIcon
				className={classes['checkbox__icon']}
				aria-hidden="true"
			/>
		</div>
		<span className={classes['checkbox__label']}>{label}</span>
	</label>
);
