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

export const spacing = {
	/** For separation of lines of text. .1875rem / 3px. */
	nudge: createSpacing('.1875rem'),
	/** For edges against a small screen. .625rem / 10px. */
	small: createSpacing('.625rem'),
	/** For vertical flow. 1rem / 16px. */
	medium: createSpacing('1rem'),
	/** For section separation. 2rem / 32px. */
	large: createSpacing('2rem'),
	/** For large screen space. 3rem / 48px. */
	grand: createSpacing('3rem'),
};

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