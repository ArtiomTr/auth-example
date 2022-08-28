import Cookies from 'js-cookie';

export type Theme = 'dark' | 'light';

export class ThemeController {
	private readonly lightThemeClassName = 'theme-light';
	private readonly themeCookieName = 'theme';
	private readonly themeCookieLifetime = 7;

	private currentTheme: Theme = 'dark';
	private isInitialized = false;

	public initialize = (extractFromDocument = false): this => {
		this.isInitialized = true;
		if (extractFromDocument) {
			this.currentTheme = this.getThemeFromDocument();
		} else {
			this.theme = this.getFromCookies() ?? this.getUserPreference();
		}

		return this;
	};

	public get theme(): Theme {
		if (!this.isInitialized) {
			throw new Error(
				'Theme controller is not initialized. Maybe you forgot to call `.initialize()`?',
			);
		}
		return this.currentTheme;
	}

	public set theme(newValue: Theme) {
		if (!this.isValidTheme(newValue)) {
			Cookies.remove(this.themeCookieName);
			throw new Error(
				`Not recognized theme value "${newValue}". Valid values are: ["dark", "light"].`,
			);
		}

		this.currentTheme = newValue;
		Cookies.set(this.themeCookieName, newValue, {
			expires: this.themeCookieLifetime,
		});

		if (newValue === 'dark') {
			document.documentElement.classList.remove(this.lightThemeClassName);
		} else {
			document.documentElement.classList.add(this.lightThemeClassName);
		}
	}

	private isValidTheme = (value: unknown): value is Theme =>
		typeof value === 'string' && ['light', 'dark'].includes(value);

	private getThemeFromDocument = (): Theme => {
		return document.documentElement.classList.contains(
			this.lightThemeClassName,
		)
			? 'light'
			: 'dark';
	};

	private getFromCookies = (): Theme | undefined => {
		const cookie = Cookies.get(this.themeCookieName);

		if (this.isValidTheme(cookie)) {
			return cookie;
		}

		return undefined;
	};

	private getUserPreference = (): Theme => {
		const { matches: isPreferringLight } = window.matchMedia(
			'(prefers-color-scheme: light)',
		);

		return isPreferringLight ? 'light' : 'dark';
	};
}
