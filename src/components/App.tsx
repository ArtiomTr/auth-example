import classes from '../styles/App.module.scss';
import { Card } from './Card';
import { SignIn } from './SignIn';
import { WelcomeContainer } from './WelcomeContainer';

export const App = () => (
	<div className={classes['app']}>
		<Card as="main" className={classes['app__auth-container']}>
			<SignIn />
		</Card>
		<WelcomeContainer className={classes['app__welcome-container']} />
	</div>
);
