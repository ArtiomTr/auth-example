import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import { activateTheme } from './utils/activateTheme';

import '@fontsource/inter/500.css';
import '@fontsource/roboto-slab/700.css';
import './styles/global.scss';

activateTheme();

const rootContainer = document.querySelector('#root');
if (!rootContainer) {
	throw new Error('Cannot mount react app - element with id "root" not found');
}

const root = createRoot(rootContainer);
root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
