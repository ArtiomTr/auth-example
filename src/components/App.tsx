import { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { domPlugin } from '@reactive-forms/dom';
import classes from '../styles/App.module.scss';
import { Card } from './Card';
import { Login } from './Login';

const plugins = createPluginArray(domPlugin);

export const App = () => (
	<FormPlugins plugins={plugins}>
		<div className={classes['app']}>
			<Card className={classes['app__auth-container']}>
				<Login />
			</Card>
		</div>
	</FormPlugins>
);
