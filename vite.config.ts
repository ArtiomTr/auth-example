import svgrPlugin from '@honkhonk/vite-plugin-svgr';
import reactPlugin from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	appType: 'spa',
	plugins: [reactPlugin(), svgrPlugin()],
});
