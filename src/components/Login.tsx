import { ReactiveFormProvider, useForm } from '@reactive-forms/core';
import { Form } from '@reactive-forms/dom';
import { Fragment } from 'react';
import { EmailField } from './EmailField';
import { Heading } from './Heading';
import { PasswordField } from './PasswordField';
import { SubmitButton } from './SubmitButton';

export const Login = () => {
	const formBag = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async (values) => {
			await new Promise((resolve) => setTimeout(resolve, 5000));
			// eslint-disable-next-line no-console
			console.log(JSON.stringify(values, undefined, 4));
		},
	});

	const { paths } = formBag;

	return (
		<ReactiveFormProvider formBag={formBag}>
			{() => (
				<Fragment>
					<Heading>Welcome back!</Heading>
					<Form>
						<EmailField label="Email" name={paths.email} required />
						<PasswordField label="Password" name={paths.password} required minLength={6} maxLength={20} />
						<SubmitButton>Sign in</SubmitButton>
					</Form>
				</Fragment>
			)}
		</ReactiveFormProvider>
	);
};
