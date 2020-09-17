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

		headerSpecialBackground: string,
		headerSpecialText: string,

		primaryA: string,
		secondary: string,

		textTitle: string,
		textSubtitle: string,
		text: string,
		textSubtle: string,
		textDisabled: string,
		textDistinct: string;
		textLink: string,

		buttonActionText: string,
		buttonActionBackground: string,

		tagNSFW: string,
		tagTop: string,
		tagLight: string,
		tagDark: string,

		/** Color used for warning information. */
		warning: string,
		/** Color used for error information. */
		error: string,
		/** Color used for success information. */
		success: string,
	};
}

const common = {
	dark: '#181B1B',
	darkP1: '#1D2020',
	darkP2: '#292D2E',

	mediumM1: '#4E5556',
	medium: '#7D8787',
	mediumP1: '#AFB6B6',

	lightM2: '#DCE0E0',
	lightM1: '#ECEEEE',
	light: '#F7F8F8',

	primaryGreen: '#62BEC1',
	primaryGreenM1: '#41A1A5',

	secondaryYellow: '#FFD681',
	secondaryBlue: '#1584AC'
};

/** The dark theme */
const darkTheme: Theme = {
	name: 'dark',
	color: {
		backgroundA: common.dark,
		backgroundB: common.darkP1,
		backgroundC: common.darkP2,
		shadow: '#111',

		headerSpecialBackground: common.secondaryYellow,
		headerSpecialText: common.light,

		primaryA: common.secondaryYellow,
		secondary: common.secondaryYellow,

		textTitle: common.light,
		textSubtitle: common.light,
		text: common.mediumP1,
		textSubtle: common.medium,
		textDisabled: common.mediumM1,
		textDistinct: common.light,
		textLink: common.secondaryYellow,

		buttonActionText: common.dark,
		buttonActionBackground: common.secondaryYellow,

		tagNSFW: '#A63446',
		tagTop: '#FFC03D',
		tagLight: common.light,
		tagDark: common.dark,

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
		backgroundA: common.light,
		backgroundB: common.lightM1,
		backgroundC: common.lightM2,
		shadow: '#DDD',

		headerSpecialText: common.secondaryBlue,

		primaryA: common.secondaryBlue,
		secondary: common.secondaryBlue,

		textTitle: common.dark,
		textSubtitle: common.dark,
		text: common.mediumM1,
		textSubtle: common.medium,
		textDisabled: common.mediumP1,
		textDistinct: common.dark,
		textLink: common.secondaryBlue,

		buttonActionText: common.light,
		buttonActionBackground: common.secondaryBlue,
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