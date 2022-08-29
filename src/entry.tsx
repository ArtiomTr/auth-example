import { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { domPlugin } from '@reactive-forms/dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import { ThemeController } from './utils/ThemeController';

import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import './styles/global.scss';

new ThemeController().initialize();

const rootContainer = document.querySelector('#root');
if (!rootContainer) {
	throw new Error(
		'Cannot mount react app - element with id "root" not found',
	);
}

const plugins = createPluginArray(domPlugin);

const root = createRoot(rootContainer);
root.render(
	<StrictMode>
		<FormPlugins plugins={plugins}>
			<App />
		</FormPlugins>
	</StrictMode>,
);
