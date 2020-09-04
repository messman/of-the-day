import * as React from 'react';
import { createGlobalStyle, ThemeProps, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { UseLocalStorageReturn } from '@messman/react-common';
import { localStorage } from '@/services/data/local-storage';

/** Custom application theme type. */
export interface Theme {
	name: string;
	color: {
		/** Primary background. */
		backgroundA: string,
		/** Secondary version of background, used for layout components. */
		backgroundB: string,
		/** Tertiary version of background, used for UI components. */
		backgroundC: string,

		primaryA: string,
		primaryB: string,

		secondary: string,

		textTitle: string,
		textSubtitle: string,
		text: string,
		textSubtle: string,
		textDisabled: string,

		textLink: string,

		buttonActionText: string,
		buttonActionBackground: string,

		/** Color used for warning information. */
		warning: string,
		/** Color used for error information. */
		error: string,
		/** Color used for success information. */
		success: string,
	};
}

/** The dark theme */
const darkTheme: Theme = {
	name: 'dark',
	color: {
		backgroundA: '#171C1C',
		backgroundB: '#1E2424',
		backgroundC: '#2E3738',
		primaryA: '#62BEC1',
		primaryB: '#41A1A5',
		secondary: '#FFD681',

		textTitle: '#F7F8F8',
		textSubtitle: '#62BEC1',
		text: '#D5DCDC',
		textSubtle: '#798A8B',
		textDisabled: '#798A8B',
		textLink: '#FFD681',

		buttonActionText: '#171C1C',
		buttonActionBackground: '#FFD681',

		warning: '#DC965A',
		error: '#A63446',
		success: '#4B7F52',
	},
};

/** The light theme */
const lightTheme: Theme = {
	...darkTheme,
	name: 'light',
	color: {
		...darkTheme.color,

		// Overrides
		backgroundA: '#171C1C',
		backgroundB: '#1E2424',
		backgroundC: '#2E3738',
		primaryA: '#62BEC1',
		primaryB: '#41A1A5',
		secondary: '#FFD681',

		textTitle: '#F7F8F8',
		textSubtitle: '#62BEC1',
		text: '#D5DCDC',
		textSubtle: '#798A8B',
		textDisabled: '#798A8B',
		textLink: '#FFD681',

		buttonActionText: '#171C1C',
		buttonActionBackground: '#FFD681',
	}
};

// Index is stored in LocalStorage
export const themes: Theme[] = [darkTheme, lightTheme];
const defaultThemeIndex = 1;

export type ThemePick<T> = (t: Theme) => T;
export type ThemePickColor = (c: Theme['color']) => string;

// For some reason, VS Code is not happy to colorize the CSS in this block when `createGlobalStyle` is used with a type.
// Note: '#root' is for storybook
// Note: overscroll-behavior comes from https://stackoverflow.com/a/50846937 to prevent macs going back (since we have horizontal scroll)
export const GlobalStyles = createGlobalStyle<ThemeProps<Theme>>`
	body {
		background-color: ${p => p.theme.color.backgroundA};
		color: ${p => p.theme.color.text};
	}

	html, body, #react-root, #root {
		margin: 0;
		padding: 0;
		height: 100%;
		overscroll-behavior: none;
	}

	* {
		font-family: 'Montserrat', sans-serif;
		font-weight: 400;
		vertical-align: top;
		-webkit-text-size-adjust: 100%;
		box-sizing: border-box;
	}
`;

const ThemeContext = React.createContext<UseLocalStorageReturn<number>>(null!);

export const ThemeProvider: React.FC = (props) => {
	const localStorageReturn = localStorage.useLocalStorage<number>('themeIndex', (value) => {
		// If not stored or no longer valid, go with the first option.
		if (value === undefined || !themes[value]) {
			return defaultThemeIndex;
		}
		return value;
	});
	const [themeIndex] = localStorageReturn;
	const theme = themes[themeIndex];

	return (
		<ThemeContext.Provider value={localStorageReturn}>
			<StyledThemeProvider theme={theme}>
				<>
					<GlobalStyles />
					{props.children}
				</>
			</StyledThemeProvider>
		</ThemeContext.Provider>
	);
};

export const useLocalStorageTheme = () => React.useContext(ThemeContext);
export const useCurrentTheme = () => {
	const [themeIndex] = React.useContext(ThemeContext);
	return themes[themeIndex];
};