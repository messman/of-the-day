import * as React from 'react';
import { createGlobalStyle, ThemeProps, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { UseLocalStorageReturn } from '@messman/react-common';
import { localStorage } from '@/services/data/local-storage';
import { ColorAccentSet, ColorElevationSet, colors, SystemColors } from './color';

export interface Theme {
	// Meta info.
	themeInfo: {
		isLight: boolean;
		accentColor: string;
		fullName: string;
	},

	accent: ColorAccentSet;

	bg: string;
	outlineDistinct: string;
	outlineSubtle: string;

	// Elevations.
	subtleFill: ColorElevationSet;
	shadow: ColorElevationSet;
	shadowBase: string;
	system: SystemColors;

	// Text colors.
	textDistinct: string;
	textSubtle: string;
	textDisabled: string;
	textLink: string;
}

const baseDarkTheme: Theme = {
	themeInfo: {
		isLight: false,
		accentColor: 'Dark',
		fullName: 'Base Dark'
	},

	accent: null!,

	bg: colors.dark.a0Darkest,
	outlineDistinct: colors.dark.d3Lighter,
	outlineSubtle: colors.dark.a0Darkest,

	subtleFill: colors.elevation.darkFill,
	shadow: colors.elevation.darkShadow,
	shadowBase: colors.elevation.darkShadowBase,
	system: colors.system.dark,

	textDistinct: colors.light.e4Lightest, // White
	textSubtle: colors.dark.e4Lightest, // "Light Gray"
	textDisabled: colors.dark.d3Lighter, // "Dark Gray"
	textLink: 'blue',
};

const baseLightTheme: Theme = {
	themeInfo: {
		isLight: true,
		accentColor: 'Light',
		fullName: 'Base Light'
	},

	accent: null!,

	bg: colors.light.d3Lighter,
	outlineDistinct: colors.light.a0Darkest,
	outlineSubtle: colors.light.b1Darker,

	subtleFill: colors.elevation.lightFill,
	shadow: colors.elevation.lightFill,
	shadowBase: colors.elevation.lightShadowBase,
	system: colors.system.light,

	textDistinct: colors.dark.a0Darkest, // Black
	textSubtle: colors.dark.d3Lighter, // "Dark Gray"
	textDisabled: colors.dark.e4Lightest, // "Light Gray"
	textLink: 'blue',
};

// const gray = {
// 	dark1: '#0F0F0F',
// 	dark2: '#141414',

// 	light1: '#F5F5F5',
// 	light2: '#F0F0F0',
// };

// const color = {
// 	darkTopBackground: '#CE9f3C',
// 	lightTopBackground: '#FFC03D',
// };

// const commonColor: Partial<ThemeColor> = {
// 	tagNSFWForeground: gray.light1,
// 	tagNSFWBackground: '#A63446',
// 	tagTopForeground: gray.dark1,

// 	settingsSelection: '#55D170',
// 	warning: '#DC965A',
// 	error: '#A63446',
// 	textDistinctOnErrorFill: '#E6DBDD',
// 	success: '#4B7F52',
// };

const purpleDarkTheme: Theme = {
	...baseDarkTheme,
	themeInfo: {
		isLight: false,
		accentColor: 'Purple',
		fullName: 'Purple / Dark'
	},

	accent: colors.accent.purple,
};

const purpleLightTheme: Theme = {
	...baseLightTheme,
	themeInfo: {
		isLight: true,
		accentColor: 'Purple',
		fullName: 'Purple / Light'
	},

	accent: colors.accent.purple,
};

const yellowDarkTheme: Theme = {
	...baseDarkTheme,
	themeInfo: {
		isLight: false,
		accentColor: 'Yellow',
		fullName: 'Yellow / Dark'
	},

	accent: colors.accent.yellow,
};

const yellowLightTheme: Theme = {
	...baseLightTheme,
	themeInfo: {
		isLight: true,
		accentColor: 'Yellow',
		fullName: 'Yellow / Light'
	},

	accent: colors.accent.yellow,
};

const redDarkTheme: Theme = {
	...baseDarkTheme,
	themeInfo: {
		isLight: false,
		accentColor: 'Red',
		fullName: 'Red / Dark'
	},

	accent: colors.accent.red,
};

const redLightTheme: Theme = {
	...baseLightTheme,
	themeInfo: {
		isLight: true,
		accentColor: 'Red',
		fullName: 'Red / Light'
	},

	accent: colors.accent.red,
};

// Index is stored in LocalStorage
export const themes: Theme[] = [purpleDarkTheme, purpleLightTheme, yellowDarkTheme, yellowLightTheme, redDarkTheme, redLightTheme];
const defaultThemeIndex = 0;

// Set from Google Font. Search for 'Montserrat' across the codebase.
export enum FontWeight {
	regular = 400,
	medium = 500,
	bold = 700
};

// For some reason, VS Code is not happy to colorize the CSS in this block when `createGlobalStyle` is used with a type.
// Note: '#root' is for storybook
// Note: overscroll-behavior comes from https://stackoverflow.com/a/50846937 to prevent macs going back (since we have horizontal scroll)
export const GlobalStyles = createGlobalStyle<ThemeProps<Theme>>`
	html {
		font-family: 'Montserrat', sans-serif;
		font-weight: ${FontWeight.regular};
		font-size: 16px;
		box-sizing: border-box;
	}

	body {
		background-color: ${p => p.theme.bg};
		color: ${p => p.theme.textDistinct};
	}

	html, body, #react-root, #root {
		margin: 0 !important;
		padding: 0 !important;
		height: 100%;
		overscroll-behavior: none;
		overflow: hidden;
	}

	* {
		vertical-align: top;
		-webkit-text-size-adjust: 100%;
		-webkit-font-smoothing: antialiased;
  		-moz-osx-font-smoothing: grayscale;
	}

	*, *:before, *:after {
		font-family: inherit;
		box-sizing: inherit;
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