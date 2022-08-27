import classes from '../styles/App.module.scss';
import { Heading } from './Heading';

export const App = () => (
	<div className={classes['app']}>
		<div className={classes['app__auth-container']}>
			<Heading>Welcome back!</Heading>
		</div>
	</div>
);
