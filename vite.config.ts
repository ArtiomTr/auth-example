import { createHash } from 'node:crypto';
import svgrPlugin from '@honkhonk/vite-plugin-svgr';
import reactPlugin from '@vitejs/plugin-react';
import { defineConfig, UserConfig } from 'vite';
import optimizeCssVariables from './postcss/optimizeCssVariables';

const classNameStorage = new Map<string, string>();

const hashClassName = (inputClassName: string, filename: string) => {
	const key = `${filename}:${inputClassName}`;
	const hash = createHash('md5').update(key).digest('hex').slice(0, 6);

	if (classNameStorage.has(hash) && classNameStorage.get(hash) !== key) {
		throw new Error(
			`ClassName hash collision: ${key} and ${classNameStorage.get(
				hash,
			)!}`,
		);
	}

	classNameStorage.set(hash, key);

	return '_' + hash;
};

export default defineConfig((environment) => {
	const sharedOptions: UserConfig = {
		appType: 'spa',
		plugins: [reactPlugin(), svgrPlugin()],
	};

	if (environment.mode === 'production') {
		return {
			...sharedOptions,
			plugins: [...sharedOptions.plugins!],
			build: {
				cssCodeSplit: false,
			},
			css: {
				postcss: {
					plugins: [optimizeCssVariables()],
				},
				modules: {
					generateScopedName(name, filename) {
						return hashClassName(name, filename);
					},
				},
			},
		};
	}

	return sharedOptions;
});
