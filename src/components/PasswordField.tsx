import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import EyeOffIcon from '../assets/icons/eye-off-outline.svg?component';
import EyeIcon from '../assets/icons/eye-outline.svg?component';
import KeyIcon from '../assets/icons/key.svg?component';
import { IconButton } from './IconButton';
import { TextField, type TextFieldProps } from './TextField';

export type PasswordFieldProps = Omit<
	TextFieldProps,
	'schema' | 'validator' | 'type' | 'minLength' | 'maxLength'
> & {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
};

export const PasswordField = ({
	required,
	minLength,
	maxLength,
	...passedProps
}: PasswordFieldProps) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const schema = useMemo(() => {
		let schema = yup.string();

		if (required) {
			schema = schema.required('Password is required.');
		}

		if (minLength) {
			schema = schema.min(
				minLength,
				'Password must be at least ${min} characters.',
			);
		}

		if (maxLength) {
			schema = schema.max(
				maxLength,
				'Password must be at most ${max} characters.',
			);
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
					title={
						isPasswordVisible ? 'Hide password' : 'Show password'
					}
					onClick={togglePasswordVisibility}
				>
					{isPasswordVisible ? (
						<EyeOffIcon aria-hidden="true" />
					) : (
						<EyeIcon aria-hidden="true" />
					)}
				</IconButton>
			}
			required={required}
			autoComplete="off"
			startAdornment={<KeyIcon aria-hidden="true" />}
			{...passedProps}
			type={isPasswordVisible ? 'text' : 'password'}
			schema={schema}
		/>
	);
};
