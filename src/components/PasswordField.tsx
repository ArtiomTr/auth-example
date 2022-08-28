import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import { IconButton } from './IconButton';
import { EyeIcon } from './icons/EyeIcon';
import { EyeOffIcon } from './icons/EyeOffIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { TextField, type TextFieldProps } from './TextField';

export type PasswordFieldProps = Omit<TextFieldProps, 'schema' | 'validator' | 'type' | 'minLength' | 'maxLength'> & {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
};

export const PasswordField = ({ required, minLength, maxLength, ...passedProps }: PasswordFieldProps) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const schema = useMemo(() => {
		let schema = yup.string();

		if (required) {
			schema = schema.required('Field is required.');
		}

		if (minLength) {
			schema = schema.min(minLength, 'Must be at least ${min} characters.');
		}

		if (maxLength) {
			schema = schema.max(maxLength, 'Must be at most ${max} characters.');
		}

		return schema;
	}, [maxLength, minLength, required]);

	const togglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible((password) => !password);
	}, []);

	return (
		<TextField
			endAdornment={
				<IconButton
					title={isPasswordVisible ? 'Hide password' : 'Show password'}
					onClick={togglePasswordVisibility}
				>
					{isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
				</IconButton>
			}
			autoComplete="off"
			startAdornment={<LockClosedIcon />}
			{...passedProps}
			type={isPasswordVisible ? 'text' : 'password'}
			schema={schema}
		/>
	);
};
