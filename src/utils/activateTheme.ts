export const activateTheme = () => {
	const { matches: isPreferringLight } = window.matchMedia('(prefers-color-scheme: light)');

	if (isPreferringLight) {
		document.documentElement.classList.add('theme-light');
	}
};
