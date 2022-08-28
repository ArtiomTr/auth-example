import { useMemo } from 'react';
import * as yup from 'yup';
import AtIcon from '../assets/icons/at-outline.svg?component';
import { TextField, type TextFieldProps } from './TextField';

export type EmailFieldProps = Omit<TextFieldProps, 'schema' | 'validator' | 'type'> & {
	required?: boolean;
};

export const EmailField = ({ required, ...passedProps }: EmailFieldProps) => {
	const schema = useMemo(() => {
		let schema = yup.string().email('Email is not valid.');

		if (required) {
			schema = schema.required('Email is required.');
		}

		return schema;
	}, [required]);

	return <TextField startAdornment={<AtIcon aria-hidden="true" />} {...passedProps} type="email" schema={schema} />;
};
