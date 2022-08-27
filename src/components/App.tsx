import classes from '../styles/App.module.scss';

export const App = () => {
	return (
		<div className={classes['app']}>
			<div className={classes['app__auth-container']}>
				<h1>Welcome back!</h1>
			</div>
		</div>
	);
};
