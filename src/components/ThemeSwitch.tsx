import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import MoonIcon from '../assets/icons/moon-outline.svg?component';
import SunnyIcon from '../assets/icons/sunny-outline.svg?component';
import classes from '../styles/ThemeSwitch.module.scss';
import { ThemeController } from '../utils/ThemeController';

export const ThemeSwitch = () => {
	const themeController = useMemo(
		() => new ThemeController().initialize(true),
		[],
	);

	const [theme, setTheme] = useState(themeController.theme);

	useEffect(() => {
		themeController.theme = theme;
	}, [theme, themeController]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTheme(event.target.checked ? 'dark' : 'light');
	};

	return (
		<span className={classes['switch']}>
			<input
				onChange={handleChange}
				aria-label="Dark mode"
				className={classes['switch__input']}
				type="checkbox"
				checked={theme === 'dark'}
				role="switch"
				aria-checked={theme === 'dark'}
			/>
			<span className={classes['switch__track']}>
				<span className={classes['switch__thumb']}>
					{theme === 'dark' ? (
						<MoonIcon aria-hidden="true" />
					) : (
						<SunnyIcon aria-hidden="true" />
					)}
				</span>
			</span>
		</span>
	);
};
