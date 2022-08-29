import { Declaration, PluginCreator } from 'postcss';
import { getCssVariableRegex, isVisited, makeVisitable, visit } from './shared';

class UniqueVariableNameGenerator {
	private readonly alphabet =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	private variablesMap: Map<string, string>;
	private counter = 0;

	public constructor() {
		this.variablesMap = new Map();
	}

	private generateUniqueVariableName = (): string => {
		let variableName = '';
		let variableIndex = this.counter;
		do {
			variableName += this.alphabet[variableIndex % this.alphabet.length];
			variableIndex = Math.floor(variableIndex / this.alphabet.length);
		} while (variableIndex > 0);

		++this.counter;

		return `--${variableName}`;
	};

	public getCompressedVariableName = (variableName: string): string => {
		let compressedVariableName = this.variablesMap.get(variableName);
		if (compressedVariableName === undefined) {
			compressedVariableName = this.generateUniqueVariableName();
			this.variablesMap.set(variableName, compressedVariableName);
		}

		return compressedVariableName;
	};
}

const plugin: PluginCreator<{}> = () => {
	const namesGenerator = new UniqueVariableNameGenerator();

	return {
		postcssPlugin: 'CSS variable name compression',
		Declaration: (declaration: Declaration) => {
			const visitable = makeVisitable(declaration);
			if (isVisited(visitable)) {
				return;
			}
			visit(visitable);

			if (declaration.prop.startsWith('--')) {
				declaration.prop = namesGenerator.getCompressedVariableName(
					declaration.prop,
				);
			}

			if (declaration.value.includes('var(--')) {
				declaration.value = declaration.value.replace(
					getCssVariableRegex(),
					(_, variableName) =>
						`var(${namesGenerator.getCompressedVariableName(
							variableName,
						)})`,
				);
			}
		},
	};
};
plugin.postcss = true;

export default plugin;
