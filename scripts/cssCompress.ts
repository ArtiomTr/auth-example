#!/usr/bin/env zxpp

/// <reference types="zx" />

import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import postcss from 'postcss';
import inlineVariablesPlugin from '../postcss/inlineCssVariables';

const main = async () => {
	if (!argv.dir) {
		throw new Error('"dir" argument is required');
	}

	const direns = await readdir(argv.dir);
	const cssFilename = direns.find((value) => /\.css$/.test(value));

	if (!cssFilename) {
		throw new Error('Cannot find css stylesheet in given directory.');
	}

	const cssContentBuffer = await readFile(path.join(argv.dir, cssFilename));
	const cssContent = cssContentBuffer.toString();
	const result = await postcss([inlineVariablesPlugin()]).process(
		cssContent,
		{
			from: undefined,
		},
	);

	await writeFile(path.join(argv.dir, cssFilename), result.css);
};

try {
	await main();
	console.log('CSS stylesheet optimized successfully');
} catch (error) {
	console.error('Failed to optimize CSS stylesheet. Reason:\n', error);
}
