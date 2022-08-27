import { ReactiveFormProvider, useForm } from '@reactive-forms/core';
import { Form } from '@reactive-forms/dom';
import { Fragment } from 'react';
import { EmailField } from './EmailField';
import { Heading } from './Heading';
import { IconButton } from './IconButton';
import { EyeIcon } from './icons/EyeIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { TextField } from './TextField';

export const Login = () => {
	const formBag = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: (values) => {
			alert(JSON.stringify(values, undefined, 4));
		},
	});

	const { paths } = formBag;

	return (
		<ReactiveFormProvider formBag={formBag}>
			{() => (
				<Fragment>
					<Heading>Welcome back!</Heading>
					<Form>
						<EmailField required label="Email" name={paths.email} />
						<TextField
							startAdornment={<LockClosedIcon />}
							endAdornment={
								<IconButton>
									<EyeIcon />
								</IconButton>
							}
							label="Password"
							type="password"
							name={paths.password}
						/>
					</Form>
				</Fragment>
			)}
		</ReactiveFormProvider>
	);
};
