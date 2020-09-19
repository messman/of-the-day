import * as React from 'react';
import { createGlobalStyle, ThemeProps, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { UseLocalStorageReturn } from '@messman/react-common';
import { localStorage } from '@/services/data/local-storage';
import { defaultFontSize } from '../symbol/text';

/** Custom application theme type. */
export interface Theme {
	colorName: string;
	isLightMode: boolean;
	color: ThemeColor;
}

export interface ThemeColor {
	/** Primary background. */
	backgroundA: string,
	/** Secondary version of background, used for layout components. */
	backgroundB: string,
	/** Tertiary version of background, used for UI components. */
	backgroundC: string,

	shadow: string,

	headerSpecialBackground: string,
	headerSpecialText: string,

	primary: string,
	secondary: string,

	textDistinct: string;
	textTitle: string,
	textSubtitle: string,
	textRegular: string,
	/** Does not need to conform to accessibility standards. */
	textDisabled: string,
	textLink: string,

	buttonActionText: string,
	buttonActionBackground: string,

	tagNSFWForeground: string,
	tagNSFWBackground: string,
	tagTopForeground: string,
	tagTopBackground: string,

	/** Color used for warning information. */
	warning: string,
	/** Color used for error information. */
	error: string,
	/** Color used for success information. */
	success: string,
}

interface Scale {
	s0: string;
	s1: string;
	s2: string;
	s3: string;
	s4: string;
	s5: string;
	s6: string;
	s7: string;
	s8: string;
	s9: string;
}

const gray: Scale = {
	s0: '#000000',
	s1: '#1A1A1A',
	s2: '#262626',
	s3: '#404040',
	s4: '#666666',
	s5: '#999999',
	s6: '#BFBFBF',
	s7: '#DEDEDE',
	s8: '#E6E6E6',
	s9: '#FFFFFF',
};

const blue: Scale = {
	s0: '#040D10',
	s1: '#08191F',
	s2: '#184B5E',
	s3: '#1C586D',
	s4: '#24718D',
	s5: '#5CAECB',
	s6: '#D7EDF5',
	s7: '#D6E0E3',
	s8: '#E7EEF0',
	s9: '#F4F7F8',
};

// const yellow: Scale = {
// 	base: '#F1C262',
// 	s0: '#211600',
// 	s1: '#2C1E00',
// 	s2: '#362400',
// 	s3: '#5C3D00',
// 	s4: '#916202',
// 	s5: '#C49535',
// 	s6: '#EABB5B',
// 	s7: '#FFD891',
// 	s8: '#FFEBC3',
// 	s9: '#FFF6E4',
// };

const commonColor: Partial<ThemeColor> = {
	tagNSFWForeground: gray.s9,
	tagNSFWBackground: '#A63446',
	tagTopForeground: gray.s0,
	tagTopBackground: '#FFC03D',

	warning: '#DC965A',
	error: '#A63446',
	success: '#4B7F52',
};

const grayLightTheme: Theme = {
	colorName: 'Gray',
	isLightMode: true,
	color: {
		...(commonColor as ThemeColor),

		backgroundA: gray.s9,
		backgroundB: gray.s8,
		backgroundC: gray.s7,
		shadow: gray.s6,

		headerSpecialBackground: gray.s5,
		headerSpecialText: gray.s4,

		primary: gray.s5,
		secondary: gray.s5,

		textDistinct: gray.s0,
		textTitle: gray.s2,
		textSubtitle: gray.s2,
		textRegular: gray.s4,
		textDisabled: gray.s5,
		textLink: gray.s4,

		buttonActionText: gray.s9,
		buttonActionBackground: gray.s5,
	}
};

const grayDarkTheme: Theme = {
	colorName: 'Gray',
	isLightMode: false,
	color: {
		...(commonColor as ThemeColor),

		backgroundA: gray.s0,
		backgroundB: gray.s1,
		backgroundC: gray.s2,
		shadow: '#111',

		headerSpecialBackground: gray.s4,
		headerSpecialText: gray.s5,

		primary: gray.s4,
		secondary: gray.s4,

		textDistinct: gray.s9,
		textTitle: gray.s7,
		textSubtitle: gray.s7,
		textRegular: gray.s6,
		textDisabled: gray.s5,
		textLink: gray.s6,

		buttonActionText: gray.s0,
		buttonActionBackground: gray.s4,
	}
};

const blueLightTheme: Theme = {
	colorName: 'Blue',
	isLightMode: true,
	color: {
		...grayLightTheme.color,

		backgroundA: blue.s9,
		backgroundB: blue.s8,
		backgroundC: blue.s7,
		shadow: gray.s6,

		headerSpecialBackground: blue.s5,
		headerSpecialText: blue.s3,

		primary: blue.s5,
		secondary: blue.s5,

		textDistinct: gray.s0,
		textTitle: gray.s2,
		textSubtitle: gray.s2,
		textRegular: gray.s4,
		textDisabled: gray.s5,
		textLink: blue.s4,

		buttonActionText: gray.s9,
		buttonActionBackground: blue.s5,
	}
};

const blueDarkTheme: Theme = {
	colorName: 'Blue',
	isLightMode: false,
	color: {
		...grayDarkTheme.color,

		backgroundA: blue.s0,
		backgroundB: blue.s1,
		backgroundC: blue.s2,
		shadow: '#111',

		headerSpecialBackground: blue.s5,
		headerSpecialText: blue.s7,

		primary: blue.s5,
		secondary: blue.s5,

		textDistinct: gray.s9,
		textTitle: gray.s7,
		textSubtitle: gray.s7,
		textRegular: gray.s6,
		textDisabled: gray.s5,
		textLink: gray.s6,

		buttonActionText: gray.s0,
		buttonActionBackground: blue.s5,
	}
};


// 
// const darkTheme: Theme = {
// 	name: 'dark',
// 	color: {
// 		backgroundA: common.dark,
// 		backgroundB: common.darkP1,
// 		backgroundC: common.darkP2,
// 		shadow: '#111',

// 		headerSpecialBackground: common.yellow,
// 		headerSpecialText: common.light,

// 		primary: common.yellow,
// 		secondary: common.yellow,

// 		textTitle: common.light,
// 		textSubtitle: common.light,
// 		textRegular: common.mediumP1,
// 		textSubtle: common.medium,
// 		textDisabled: common.mediumM1,
// 		textDistinct: common.light,
// 		textLink: common.yellow,

// 		buttonActionText: common.dark,
// 		buttonActionBackground: common.green,

// 		tagNSFW: '#A63446',
// 		tagTop: '#FFC03D',
// 		tagLight: common.light,
// 		tagDark: common.dark,

// 		warning: '#DC965A',
// 		error: '#A63446',
// 		success: '#4B7F52',
// 	},
// };

// 
// const lightTheme: Theme = {
// 	...darkTheme,
// 	name: 'light',
// 	color: {
// 		...darkTheme.color,

// 		// Overrides
// 		backgroundA: common.light,
// 		backgroundB: common.lightM1,
// 		backgroundC: common.lightM2,
// 		shadow: '#DDD',

// 		headerSpecialBackground: common.green,
// 		headerSpecialText: common.light,

// 		primary: common.green,
// 		secondary: common.green,

// 		textTitle: common.dark,
// 		textSubtitle: common.dark,
// 		textRegular: common.mediumM1,
// 		textSubtle: common.medium,
// 		textDisabled: common.mediumP1,
// 		textDistinct: common.dark,
// 		textLink: common.green,

// 		buttonActionText: common.light,
// 		buttonActionBackground: common.yellow,
// 	}
// };

// Index is stored in LocalStorage
export const themes: Theme[] = [grayLightTheme, blueLightTheme, grayDarkTheme, blueDarkTheme];
const defaultThemeIndex = 0;

export type ThemePick<T> = (t: Theme) => T;
export type ThemePickColor = (c: ThemeColor) => string;

// For some reason, VS Code is not happy to colorize the CSS in this block when `createGlobalStyle` is used with a type.
// Note: '#root' is for storybook
// Note: overscroll-behavior comes from https://stackoverflow.com/a/50846937 to prevent macs going back (since we have horizontal scroll)
export const GlobalStyles = createGlobalStyle<ThemeProps<Theme>>`
	html {
		font-size: ${defaultFontSize};
	}

	body {
		background-color: ${p => p.theme.color.backgroundA};
		color: ${p => p.theme.color.textRegular};
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