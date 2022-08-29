import { useField } from '@reactive-forms/core';
import { Pxth } from 'pxth';
import { ChangeEvent } from 'react';
import { Checkbox, CheckboxProps } from './Checkbox';

export type CheckboxFieldProps = Omit<CheckboxProps, 'checked'> & {
	path: Pxth<boolean>;
};

export const CheckboxField = ({
	path,
	onChange,
	...passedProps
}: CheckboxFieldProps) => {
	const {
		value,
		control: { setValue },
	} = useField({
		name: path,
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.checked);
		onChange?.(event);
	};

	return (
		<Checkbox {...passedProps} checked={value} onChange={handleChange} />
	);
};
