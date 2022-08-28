import { useFormContext, useFormMeta } from '@reactive-forms/core';
import { PropsWithChildren } from 'react';
import { Button } from './Button';

export const SubmitButton = ({ children }: PropsWithChildren) => {
	const {
		formMeta: { paths },
	} = useFormContext();

	const isSubmitting = useFormMeta(paths.isSubmitting);

	return (
		<Button disabled={isSubmitting} type="submit" isLoading={isSubmitting}>
			{children}
		</Button>
	);
};
