import { PropsWithChildren } from 'react';
import baseStyled, { css as baseCss, ThemedStyledInterface, ThemeProps, FlattenInterpolation, ThemedCssFunction } from 'styled-components';
import { Theme } from './theme';
export { ThemeProvider, keyframes } from 'styled-components';

// Export wrapped styled
export const tStyled = baseStyled as ThemedStyledInterface<Theme>;

// Export wrapped css
export const tCss = baseCss as ThemedCssFunction<Theme>;
export type ThemedCSS = FlattenInterpolation<ThemeProps<Theme>>;

export interface StyledProps {
	className?: string;
	as?: any;
}
export type StyledFC<P> = React.FC<P & StyledProps>;
export type StyledFCProps<T> = PropsWithChildren<T> & StyledProps;