import classes from '../styles/App.module.scss';
import { Card } from './Card';
import { Footer } from './Footer';
import { Header } from './Header';
import { SignIn } from './SignIn';
import { WelcomeContainer } from './WelcomeContainer';

export const App = () => (
	<div className={classes['app']}>
		<Header className={classes['app__header']} />
		<div className={classes['app__main']}>
			<Card className={classes['app__main-card']} as="main">
				<SignIn />
			</Card>
		</div>
		<WelcomeContainer className={classes['app__welcome']} />
		<Footer className={classes['app__footer']} />
	</div>
);
