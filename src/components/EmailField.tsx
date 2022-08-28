import { useMemo } from 'react';
import * as yup from 'yup';
import { AtIcon } from './icons/AtIcon';
import { TextField, type TextFieldProps } from './TextField';

export type EmailFieldProps = Omit<TextFieldProps, 'schema' | 'validator' | 'type'> & {
	required?: boolean;
};

export const EmailField = ({ required, ...passedProps }: EmailFieldProps) => {
	const schema = useMemo(() => {
		let schema = yup.string().email("That's not valid email.");

		if (required) {
			schema = schema.required('This field is required.');
		}

		return schema;
	}, [required]);

	return <TextField startAdornment={<AtIcon />} {...passedProps} type="email" schema={schema} />;
};
