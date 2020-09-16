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

		shadow: string,

		primaryA: string,
		primaryB: string,

		secondary: string,

		textSpecialHeader: string,
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
		backgroundB: '#1C2121', // Lighter
		backgroundC: '#202727', // Lighter
		shadow: '#111',

		primaryA: '#62BEC1',
		primaryB: '#41A1A5', // Darker Primary
		secondary: '#FFD681', // Yellow

		textSpecialHeader: '#FFD681', // Secondary
		textLink: '#FFD681', // Secondary

		textTitle: '#F7F8F8', // Lightest
		textSubtitle: '#62BEC1', // Primary
		text: '#ACB9B9', // Light Medium
		textSubtle: '#798A8B', // Medium
		textDisabled: '#4A5859', // Dark Medium

		buttonActionText: '#171C1C', // Background (Dark)
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
		backgroundA: '#F7F8F8',
		backgroundB: '#ECEFEF', // Darker
		backgroundC: '#E0E5E5', // Darker
		shadow: '#DDD',

		primaryA: '#62BEC1',
		secondary: '#1584AC', // Blue

		textSpecialHeader: '#1584AC', // Secondary
		textLink: '#1584AC', // Secondary

		textTitle: '#171C1C', // Darkest
		textSubtitle: '#62BEC1', // Primary
		text: '#4A5859', // Dark Medium
		textSubtle: '#798A8B', // Medium
		textDisabled: '#ACB9B9', // Light Medium

		buttonActionText: '#F7F8F8', // Background (Light)
		buttonActionBackground: '#1584AC',
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