import reactPlugin from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	appType: 'spa',
	plugins: [reactPlugin()],
});
