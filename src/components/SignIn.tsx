import { ReactiveFormProvider, useForm } from '@reactive-forms/core';
import { Form } from '@reactive-forms/dom';
import classes from '../styles/SignIn.module.scss';
import { CheckboxField } from './CheckboxField';
import { EmailField } from './EmailField';
import { Heading } from './Heading';
import { PasswordField } from './PasswordField';
import { SubmitButton } from './SubmitButton';

export const SignIn = () => {
	const formBag = useForm({
		initialValues: {
			email: '',
			password: '',
			staySignedIn: false,
		},
		onSubmit: async (values) => {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			// eslint-disable-next-line no-console
			console.log(JSON.stringify(values, undefined, 4));
		},
	});

	const { paths } = formBag;

	return (
		<ReactiveFormProvider formBag={formBag}>
			{() => (
				<Form className={classes['form']} noValidate>
					<Heading variant="h5" as="h1">
						Sign in to continue
					</Heading>
					<EmailField label="Email" name={paths.email} required />
					<PasswordField
						label="Password"
						name={paths.password}
						required
						minLength={6}
						maxLength={20}
					/>
					<CheckboxField
						label="Stay signed in?"
						path={paths.staySignedIn}
					/>
					<SubmitButton className={classes['form__submit-button']}>
						Sign in
					</SubmitButton>
					<nav className={classes['form__nav']}>
						<a
							className={classes['link']}
							href="#password-recovery"
						>
							Password recovery
						</a>
						<a className={classes['link']} href="#sign-up">
							Sign up
						</a>
					</nav>
				</Form>
			)}
		</ReactiveFormProvider>
	);
};
