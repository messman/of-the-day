// Wraps styled-components in TypeScript and our custom theme interface.

import baseStyled, { css as baseCss, ThemedStyledInterface, BaseThemedCssFunction, createGlobalStyle, ThemeProps, FlattenInterpolation, CSSObject, ThemedGlobalStyledClassProps } from "styled-components";
export { ThemeProvider, keyframes } from "styled-components";

/** Our theme object. */
export interface Theme {
	color: {
		/** Background */
		bg: string,
		/** All our text */
		text: string,
		/** The background of the bad info area */
		badInfo: string,
		/** The background of the important info area */
		importantInfo: string,
		/** Checkmark color for completed checklist items */
		completedToDo: string,
		/** Checkmark color for incomplete checklist items */
		incompleteToDo: string,
		/** Link color */
		link: string
	};
	fontFamily: string;
}

/** The default "light" theme */
const defaultTheme: Theme = {
	color: {
		bg: "#FFF",
		text: "#333",
		badInfo: "#F49797",
		importantInfo: "#97C8FB",
		completedToDo: "#79BC58",
		incompleteToDo: "#B9B9B9",
		link: "#3E90E5"
	},
	fontFamily: `'Montserrat', sans-serif`
}

/** The "dark" theme, based off the default. */
const darkTheme: Theme = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		bg: "#222",
		text: "#EEE",
		badInfo: "#c63232",
		importantInfo: "#5694d4",
		link: "#4fa0f5"
	}
}

interface ThemeInfo {
	name: string,
	theme: Theme
}
export const themes: ThemeInfo[] = [
	{ name: "light", theme: defaultTheme },
	{ name: "dark", theme: darkTheme },
];

// Export wrapped styled
const styled = baseStyled as ThemedStyledInterface<Theme>;
export default styled;

// Export wrapped css
export const css = baseCss as BaseThemedCssFunction<Theme>;
export type ThemedCSS = FlattenInterpolation<ThemeProps<Theme>>;

interface ClassNameProps {
	className?: string
}
export type StyledFC<P> = React.FC<P & ClassNameProps>;

// For some reason, VS Code is not happy to colorize the CSS in this block when `createGlobalStyle` is used with a type.
export const GlobalAppStyles = createGlobalStyle<ThemeProps<Theme>>`
	html {
		font-family: ${p => p.theme.fontFamily};
		font-weight: 300;
	}
	
	body {
		background-color: ${p => p.theme.color.bg};
		color: ${p => p.theme.color.text};
	}

	html, body, #react-root {
		margin: 0;
		padding: 0;
		height: 100%;
	}

	* {
		-webkit-text-size-adjust: 100%;
		box-sizing: border-box;
		z-index: 1;
	}
`;