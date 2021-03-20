import * as React from 'react';
import { createGlobalStyle, ThemeProps, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { UseLocalStorageReturn } from '@messman/react-common';
import { localStorage } from '@/services/data/local-storage';

/** Custom application theme type. */
export interface Theme {
	colorName: string;
	isLightMode: boolean;
	color: ThemeColor;
}

export interface ThemeColor {
	/** Main application background. */
	bg1: string;
	/** Secondary version of background - used for contrast against the first. */
	bg2: string;

	/** Background used for components. */
	bgComponent1: string;
	bgComponent2: string;
	bgComponent3: string;
	bgComponentShadow1: string;


	/** The gradient of the accent. */
	accentGradient: string;
	/**
	 * Used specifically for a fill on top of the accent gradient, with a shadow.
	 */
	accentGradientFill: string;
	accentGradientFillShadow: string;
	/**
	 * The accent color, on the background. May be lighter on dark themes and darker on light themes,
	 * but not to the same extent as the text version.
	 */
	accentFillOnBackground: string;
	/**
	 * The accent color, used for text, on the background. May be lighter on dark themes and darker on light themes.
	 */
	textAccentOnBackground: string;
	/** Text that is distinct on top of the accent color. */
	textDistinctOnAccent: string;
	/** Text that is still readable on top of the accent color, but just barely. */
	textSubtleOnAccent: string;

	textHeading1: string;
	textHeading2: string;
	textHeading3: string;
	textRegular: string;
	textInactive: string;
	/** Does not need to conform to accessibility standards. */
	textDisabled: string;
	textLink: string;

	tagNSFWForeground: string;
	tagNSFWBackground: string;
	tagTopForeground: string;
	tagTopBackground: string;

	settingsSelection: string;

	/** Color used for warning information. */
	warning: string;
	/** Color used for error information. */
	error: string;
	/** Color used for error text on top of the error fill color. */
	textDistinctOnErrorFill: string;
	/** Color used for success information. */
	success: string;
}

const gray = {
	dark1: '#0F0F0F',
	dark2: '#141414',

	light1: '#F5F5F5',
	light2: '#F0F0F0',
};

const color = {
	darkTopBackground: '#CE9f3C',
	lightTopBackground: '#FFC03D',
};

const commonColor: Partial<ThemeColor> = {
	tagNSFWForeground: gray.light1,
	tagNSFWBackground: '#A63446',
	tagTopForeground: gray.dark1,

	settingsSelection: '#55D170',
	warning: '#DC965A',
	error: '#A63446',
	textDistinctOnErrorFill: '#E6DBDD',
	success: '#4B7F52',
};

const purpleDarkTheme: Theme = {
	colorName: 'Purple',
	isLightMode: false,
	color: {
		...(commonColor as ThemeColor),

		bg1: gray.dark1,
		bg2: gray.dark2,
		bgComponent1: '#19191A',
		bgComponent2: '#202022',
		bgComponent3: '#2A2A2C',
		bgComponentShadow1: '#0A0A0A',

		accentGradient: 'linear-gradient(134deg, #6551C7 0%, #5955D1 39%, #5955D1 58%, #3948BA 100%)',
		accentGradientFill: '#5955D1',
		accentGradientFillShadow: '#3430A1',
		accentFillOnBackground: '#7673E2',
		textAccentOnBackground: '#7F7CE8',
		textDistinctOnAccent: '#DFDFEA',
		textSubtleOnAccent: gray.dark1,

		textHeading1: '#DADADD',
		textHeading2: '#D1D1D6',
		textHeading3: '#C6C6CD',
		textRegular: '#BDBDC1',
		textInactive: '#8C8C8C',
		textDisabled: '#666666',
		textLink: '#7F7CE8',

		tagTopBackground: color.darkTopBackground
	}
};

const purpleLightTheme: Theme = {
	colorName: 'Purple',
	isLightMode: true,
	color: {
		...(commonColor as ThemeColor),

		bg1: gray.light1,
		bg2: gray.light2,
		bgComponent1: '#E8E8E9',
		bgComponent2: '#E0E0E1',
		bgComponent3: '#D0D0D2',
		bgComponentShadow1: 'rgba(211,211,211,0.50)',

		accentGradient: 'linear-gradient(134deg, #6551C7 0%, #5955D1 39%, #5955D1 58%, #3948BA 100%)',
		accentGradientFill: '#5955D1',
		accentGradientFillShadow: '#3430A1',
		accentFillOnBackground: '#5955D1',
		textAccentOnBackground: '#534FC3',
		textDistinctOnAccent: '#DFDFEA',
		textSubtleOnAccent: '#DFDFEA',

		textHeading1: '#242428',
		textHeading2: '#2D2D34',
		textHeading3: '#353540',
		textRegular: '#3D3D42',
		textInactive: '#737373',
		textDisabled: '#999999',
		textLink: '#534FC3',

		tagTopBackground: color.lightTopBackground
	}
};

const yellowDarkTheme: Theme = {
	colorName: 'Yellow',
	isLightMode: false,
	color: {
		...(commonColor as ThemeColor),

		bg1: gray.dark1,
		bg2: gray.dark2,
		bgComponent1: '#1A1A1A',
		bgComponent2: '#212121',
		bgComponent3: '#2B2B2B',
		bgComponentShadow1: '#0A0A0A',

		accentGradient: 'linear-gradient(-45deg, #CD9240 0%, #F5B83D 38%, #F5B83D 65%, #F8CF7C 100%)',
		accentGradientFill: '#F5B83D',
		accentGradientFillShadow: '#CA9325',
		accentFillOnBackground: '#F5B83D',
		textAccentOnBackground: '#F7CA6F',
		textDistinctOnAccent: gray.dark1,
		textSubtleOnAccent: '#46371A',

		textHeading1: '#DCDBDB',
		textHeading2: '#D5D4D2',
		textHeading3: '#CCCAC7',
		textRegular: '#C0BFBF',
		textInactive: '#8C8C8C',
		textDisabled: '#666666',
		textLink: '#F7CA6F',

		tagTopBackground: color.darkTopBackground
	}
};

const yellowLightTheme: Theme = {
	colorName: 'Yellow',
	isLightMode: true,
	color: {
		...(commonColor as ThemeColor),

		bg1: gray.light1,
		bg2: gray.light2,
		bgComponent1: '#E9E8E8',
		bgComponent2: '#E1E1E0',
		bgComponent3: '#D2D1D0',
		bgComponentShadow1: 'rgba(211,211,211,0.50)',

		accentGradient: 'linear-gradient(-45deg, #EBA749 0%, #F5B83D 38%, #F5B83D 65%, #F8CF7C 100%)',
		accentGradientFill: '#F5B83D',
		accentGradientFillShadow: '#CA9325',
		accentFillOnBackground: '#F5B83D',
		textAccentOnBackground: '#82601B',
		textDistinctOnAccent: gray.dark1,
		textSubtleOnAccent: '#624B1B',

		textHeading1: '#282624',
		textHeading2: '#33312E',
		textHeading3: '#403C35',
		textRegular: '#41403E',
		textInactive: '#737373',
		textDisabled: '#999999',
		textLink: '#82601B',

		tagTopBackground: color.lightTopBackground
	}
};

const redDarkTheme: Theme = {
	colorName: 'Red',
	isLightMode: false,
	color: {
		...(commonColor as ThemeColor),

		bg1: gray.dark1,
		bg2: gray.dark2,
		bgComponent1: '#1A1A1A',
		bgComponent2: '#212121',
		bgComponent3: '#2B2B2B',
		bgComponentShadow1: '#0A0A0A',

		accentGradient: 'linear-gradient(135deg, #E078A4 0%, #CB697A 37%, #CB697A 65%, #DA5856 100%)',
		accentGradientFill: '#CB697A',
		accentGradientFillShadow: '#A04454',
		accentFillOnBackground: '#CB697A',
		textAccentOnBackground: '#DC697D',
		textDistinctOnAccent: gray.dark1,
		textSubtleOnAccent: gray.dark1,

		textHeading1: '#DCDADB',
		textHeading2: '#D2D0D0',
		textHeading3: '#CCC7C8',
		textRegular: '#C1BEBE',
		textInactive: '#8C8C8C',
		textDisabled: '#666666',
		textLink: '#DC697D',

		tagTopBackground: color.darkTopBackground
	}
};

const redLightTheme: Theme = {
	colorName: 'Red',
	isLightMode: true,
	color: {
		...(commonColor as ThemeColor),

		bg1: gray.light1,
		bg2: gray.light2,
		bgComponent1: '#E9E8E8',
		bgComponent2: '#E1E0E0',
		bgComponent3: '#D2D0D0',
		bgComponentShadow1: 'rgba(211,211,211,0.50)',

		accentGradient: 'linear-gradient(135deg, #E078A4 0%, #CB697A 37%, #CB697A 65%, #DA5856 100%)',
		accentGradientFill: '#CB697A',
		accentGradientFillShadow: '#A04454',
		accentFillOnBackground: '#CB697A',
		textAccentOnBackground: '#984553',
		textDistinctOnAccent: gray.dark1,
		textSubtleOnAccent: '#361414',

		textHeading1: '#282425',
		textHeading2: '#332E2F',
		textHeading3: '#403537',
		textRegular: '#413E3F',
		textInactive: '#737373',
		textDisabled: '#999999',
		textLink: '#984553',

		tagTopBackground: color.lightTopBackground
	}
};

// Index is stored in LocalStorage
export const themes: Theme[] = [purpleDarkTheme, purpleLightTheme, yellowDarkTheme, yellowLightTheme, redDarkTheme, redLightTheme];
const defaultThemeIndex = 0;

export type ThemePick<T> = (t: Theme) => T;
export type ThemePickColor = (c: ThemeColor) => string;

// Set from Google Font. Search for 'Montserrat' across the codebase.
export enum FontWeight {
	medium = 500,
	bold = 700,
	extraBold = 800
};

// For some reason, VS Code is not happy to colorize the CSS in this block when `createGlobalStyle` is used with a type.
// Note: '#root' is for storybook
// Note: overscroll-behavior comes from https://stackoverflow.com/a/50846937 to prevent macs going back (since we have horizontal scroll)
export const GlobalStyles = createGlobalStyle<ThemeProps<Theme>>`
	html {
		font-size: 16px;
	}

	body {
		background-color: ${p => p.theme.color.bg1};
		color: ${p => p.theme.color.textRegular};
	}

	html, body, #react-root, #root {
		margin: 0;
		padding: 0;
		height: 100%;
		overscroll-behavior: none;
		overflow: hidden;
		font-weight: ${FontWeight.medium};
	}

	* {
		font-family: 'Montserrat', sans-serif;
		vertical-align: top;
		box-sizing: border-box;
		-webkit-text-size-adjust: 100%;
		-webkit-font-smoothing: antialiased;
	}

	h1, h2, h3, h4, h5, h6, p {
		margin: 0;
	}

	h1 {
		color: ${p => p.theme.color.textHeading1};
	}
	h2 {
		color: ${p => p.theme.color.textHeading2};
	}
	h3, h4, h5, h6 {
		color: ${p => p.theme.color.textHeading3};
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