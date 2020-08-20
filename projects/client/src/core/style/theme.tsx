import * as React from 'react';
import { createGlobalStyle, ThemeProps, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { DefaultLayoutBreakpoint, UseLocalStorageReturn } from '@messman/react-common';
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

		/** All our text and icons that aren't superseded by another color. */
		textAndIcon: string,
		/** Color of text links. */
		link: string,
		/** Disabled text. */
		disabled: string,

		/** Color used for warning information. */
		warning: string,
		/** Color used for error information. */
		error: string,
		/** Color used for success information. */
		success: string,
		/** Color used for primary information. */
		primary: string,
	};
}

/** The dark theme */
const darkTheme: Theme = {
	name: 'dark',
	color: {
		backgroundA: '#1A1A1A',
		backgroundB: '#262626',
		backgroundC: '#2B2B2B',
		textAndIcon: '#EEEEEE',
		link: '#2589BD',
		disabled: '#646464',
		warning: '#DC965A',
		error: '#A63446',
		success: '#4B7F52',
		primary: '#558C8C'
	},
};

/** The light theme */
const lightTheme: Theme = {
	...darkTheme,
	name: 'light',
	color: {
		...darkTheme.color,

		// Overrides
		backgroundA: '#F8F8F8',
		backgroundB: '#EAEAEA',
		backgroundC: '#CCCCCC',
		textAndIcon: '#222222',
		disabled: '#999999',
	}
};

// Index is stored in LocalStorage
export const themes: Theme[] = [darkTheme, lightTheme];
const defaultThemeIndex = 1;

// For some reason, VS Code is not happy to colorize the CSS in this block when `createGlobalStyle` is used with a type.
// Note: '#root' is for storybook
// Note: overscroll-behavior comes from https://stackoverflow.com/a/50846937 to prevent macs going back (since we have horizontal scroll)
export const GlobalStyles = createGlobalStyle<ThemeProps<Theme>>`
	body {
		background-color: ${p => p.theme.color.backgroundA};
		color: ${p => p.theme.color.textAndIcon};
	}

	html, body, #react-root, #root {
		margin: 0 auto;
		padding: 0;
		height: 100%;
		max-width: ${DefaultLayoutBreakpoint.wide}px;

		overscroll-behavior: none;
	}

	* {
		font-family: 'Montserrat', sans-serif;
		font-weight: 400;
		vertical-align: top;
		-webkit-text-size-adjust: 100%;
		box-sizing: border-box;
		z-index: 1;
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