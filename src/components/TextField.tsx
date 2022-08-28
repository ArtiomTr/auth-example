import { FieldValidationProps, useField } from '@reactive-forms/core';
import { type Pxth } from 'pxth';
import { type ChangeEvent, useCallback, type FocusEvent } from 'react';

import { Input, type InputProps } from './Input';

export type TextFieldProps = Omit<InputProps, 'value' | 'name'> & {
	name: Pxth<string>;
} & FieldValidationProps<string>;

export const TextField = ({ name, onChange, onBlur, schema, validator, ...passedProps }: TextFieldProps) => {
	const {
		value,
		control: { setValue, setTouched },
		meta: { error, touched },
	} = useField({ name, schema, validator });

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setValue(event.target.value);
			onChange?.(event);
		},
		[setValue, onChange],
	);

	const handleBlur = useCallback(
		(event: FocusEvent<HTMLInputElement>) => {
			setTouched({ $touched: true });
			onBlur?.(event);
		},
		[onBlur, setTouched],
	);

	return (
		<Input
			{...passedProps}
			error={(touched?.$touched && error?.$error) || undefined}
			onBlur={handleBlur}
			onChange={handleChange}
			value={value}
		/>
	);
};
