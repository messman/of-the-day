import { StyledComponent } from 'styled-components';
import { css, styled } from '@/core/style/styled';
import { Theme } from './theme';

/** Border-radius style. .375rem / 6px. */
export const borderRadiusValue: string = '.375rem';
export const borderRadiusStyle = css`
	border-radius: ${borderRadiusValue};
`;

export interface Spacing {
	value: string;
	vertical: string;
	horizontal: string;
	top: string;
	right: string;
	bottom: string;
	left: string;
}

function createSpacing(value: string): Spacing {
	return {
		value: value,
		vertical: `${value} 0`,
		horizontal: `0 ${value}`,
		top: `${value} 0 0 0`,
		right: `0 ${value} 0 0`,
		bottom: `0 0 ${value} 0`,
		left: `0 0 0 ${value}`
	};
}

/** Smaller padding value, for edges against the screen. .625rem / 10px. */
export const smallerSpacingValue: string = '.625rem';
export const smallerSpacing = createSpacing(smallerSpacingValue);
/** Larger padding value, for vertical flow. 1rem / 16px. */
export const largerSpacingValue: string = '1rem';
export const largerSpacing = createSpacing(largerSpacingValue);

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