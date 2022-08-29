import { PluginCreator } from 'postcss';
import { getCssVariableRegex, isVisited, makeVisitable, visit } from './shared';

const incrementCounter = (map: Map<string, number>, variableName: string) => {
	const currentCount = map.get(variableName) ?? 0;
	map.set(variableName, currentCount + 1);
};

const getCounter = (map: Map<string, number>, variableName: string) =>
	map.get(variableName) ?? 0;

class VariableInliner {
	private variableDeclarationMap: Map<string, number>;
	private variableUsageMap: Map<string, number>;
	private variableValueMap: Map<string, string>;

	public constructor() {
		this.variableDeclarationMap = new Map();
		this.variableUsageMap = new Map();
		this.variableValueMap = new Map();
	}

	public registerDeclaration = (variableName: string, value: string) => {
		this.variableValueMap.set(variableName, value);
		incrementCounter(this.variableDeclarationMap, variableName);
	};

	public registerUsage = (variableName: string) => {
		incrementCounter(this.variableUsageMap, variableName);
	};

	public shouldInline = (variableName: string) => {
		const variableValue = this.getValue(variableName);
		const usageCount = getCounter(this.variableUsageMap, variableName);
		const declarationCount = getCounter(
			this.variableDeclarationMap,
			variableName,
		);

		// Strip unused variables.
		if (usageCount === 0) {
			return true;
		}

		// Cannot inline css variables that have multiple declarations.
		if (declarationCount > 1) {
			return false;
		}

		// Check how much space will be used if keep variable.
		const currentLength =
			`var(${variableName})`.length * usageCount +
			`${variableName}:${variableValue}`.length;
		// Check how much space will be used when inlined.
		const possibleLength = variableValue.length * usageCount;

		return possibleLength < currentLength;
	};

	public getValue = (variableName: string) => {
		const variableValue = this.variableValueMap.get(variableName);

		if (variableValue === undefined) {
			throw new Error(`Unknown variable ${variableName} received.`);
		}

		return variableValue;
	};
}

const plugin: PluginCreator<{}> = () => {
	const inliner = new VariableInliner();
	let inlinedVariablesCounter = 0;

	return {
		postcssPlugin: 'Inline css variables plugin',
		Root: (rootNode) => {
			const visitable = makeVisitable(rootNode);
			if (isVisited(visitable)) {
				return;
			}
			visit(visitable);

			rootNode.walkDecls((declaration) => {
				if (declaration.prop.startsWith('--')) {
					inliner.registerDeclaration(
						declaration.prop,
						declaration.value,
					);
				}

				if (declaration.value.includes('var(--')) {
					const variableMatches = declaration.value.matchAll(
						getCssVariableRegex(),
					);

					for (const [, variableName] of variableMatches) {
						inliner.registerUsage(variableName);
					}
				}
			});
		},
		Declaration: (declaration) => {
			const visitable = makeVisitable(declaration);
			if (isVisited(visitable)) {
				return;
			}
			visit(visitable);

			if (
				declaration.prop.startsWith('--') &&
				inliner.shouldInline(declaration.prop)
			) {
				++inlinedVariablesCounter;
				declaration.remove();

				return;
			}

			if (declaration.value.includes('var(--')) {
				declaration.value = declaration.value.replace(
					getCssVariableRegex(),
					(source, variableName) => {
						if (inliner.shouldInline(variableName)) {
							return inliner.getValue(variableName);
						}
						return source;
					},
				);
			}
		},
		OnceExit() {
			console.log(`Inlined ${inlinedVariablesCounter} variables`);
		},
	};
};
plugin.postcss = true;

export default plugin;
