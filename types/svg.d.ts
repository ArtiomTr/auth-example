import { SVGAttributes, type ComponentType } from 'react';

declare module '*.svg?component' {
	const component: ComponentType<SVGAttributes<SVGSVGElement>>;

	export default component;
}
