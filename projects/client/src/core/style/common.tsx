import { StyledComponent } from 'styled-components';
import { css, styled } from '@/core/style/styled';
import { Theme } from './theme';

/** Border-radius style. .375rem / 6px. */
export const borderRadiusValue: string = '.375rem';
export const borderRadiusStyle = css`
	border-radius: ${borderRadiusValue};
`;

export const noTouchStyle = css`
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
`;

export const Link = styled.a`
	color: ${p => p.theme.color.link};

	&:link, &:active, &:visited, &:hover {
		color: ${p => p.theme.color.link};
	}
`;

/** Smaller padding value, for edges against the screen. .625rem / 10px. */
export const spacingAValue: string = '.625rem';
/** Larger padding value, for vertical flow. 1rem / 16px. */
export const spacingBValue: string = '1rem';

/** Returns a new component that has the specified padding value. */
export function addPadding<T extends StyledComponent<any, Theme, {}, never>>(component: T, padding: string) {
	return styled(component)`
		padding: ${padding};
	`;
}

/** Returns a new component that has the specified margin value. */
export function addMargin<T extends StyledComponent<any, Theme, {}, never>>(component: T, margin: string) {
	return styled(component)`
		margin: ${margin};
	`;
}