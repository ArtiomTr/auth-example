const visited = Symbol('visited');

export type Visitable<T> = T & Record<typeof visited, boolean>;

export const makeVisitable = <T>(value: T): Visitable<T> => {
	if (!(visited in value)) {
		(value as Visitable<T>)[visited] = false;
	}

	return value as Visitable<T>;
};

export const isVisited = <T>(visitable: Visitable<T>): boolean => {
	return visitable[visited];
};

export const visit = <T>(visitable: Visitable<T>) => {
	visitable[visited] = true;
};

export const getCssVariableRegex = () => /var\(\s*(--[\w-]+)\s*\)/g;
