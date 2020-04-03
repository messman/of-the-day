import baseStyled, { css as baseCss, ThemedStyledInterface, BaseThemedCssFunction, createGlobalStyle, ThemeProps, FlattenInterpolation, CSSObject, ThemedGlobalStyledClassProps } from "styled-components";
export { ThemeProvider, keyframes } from "styled-components";

export interface Theme {
	color: {
		bg: string,
		text: string,
		badInfo: string,
		importantInfo: string,
		completedToDo: string,
		incompleteToDo: string,
		link: string
	};
	fontFamily: string;
}

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
	{ name: "default", theme: defaultTheme },
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
		box-sizing: border-box;
		z-index: 1;
	}
`;