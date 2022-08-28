import { useFormContext, useFormMeta } from '@reactive-forms/core';
import { Button, type ButtonProps } from './Button';

export type SubmitButtonProps = Omit<ButtonProps, 'type' | 'disabled' | 'isLoading'>;

export const SubmitButton = ({ children, ...passedProps }: SubmitButtonProps) => {
	const {
		formMeta: { paths },
	} = useFormContext();

	const isSubmitting = useFormMeta(paths.isSubmitting);

	return (
		<Button {...passedProps} disabled={isSubmitting} type="submit" isLoading={isSubmitting}>
			{children}
		</Button>
	);
};
