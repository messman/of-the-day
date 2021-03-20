import { tStyled } from '../style/styled';
import { lineBreakpoint } from '@/services/layout/window-layout';

export const LineMaxWidthCenter = tStyled.div`
	max-width: ${lineBreakpoint};
	margin-left: auto;
	margin-right: auto;
	text-align: center;
`;

// /** For separation of lines of text. .1875rem */
// nudge: createSpacing('.1875rem'),
// /** For edges against a small screen. .5rem */
// small: createSpacing('.5rem'),
// /** For vertical flow. .875rem */
// medium: createSpacing('.875rem'),
// /** For section separation. 2.2rem */
// large: createSpacing('2.2rem'),
// /** For large screen space. 4.5rem */
// grand: createSpacing('4.5rem'),

export enum Spacing {
	/** 1/9: .25rem / 4px */
	ant04 = '.25rem',
	/** 2/9: .5rem / 8px */
	bat08 = '.5rem',
	/** 3/9: .75rem / 12px */
	cat12 = '.75rem',
	/** 4/9: 1rem / 16px */
	dog16 = '1rem',
	/** 5/9: 1.5rem / 24px */
	elf24 = '1.5rem',
	/** 6/9: 2rem / 32px */
	fan32 = '2rem',
	/** 7/9: 2.5rem / 40px */
	guy40 = '2.5rem',
	/** 8/9: 3.5rem / 56px */
	hut56 = '3.5rem',
	/** 9/9: 4rem / 64px */
	inn64 = '4rem',
}

export interface SpacingCSS {
	value: string;
	vertical: string;
	horizontal: string;
	top: string;
	right: string;
	bottom: string;
	left: string;
}

function createSpacingShort(prefix: string, suffix: string): Record<keyof typeof Spacing, string> {
	return {
		ant04: `${prefix}${Spacing.ant04}${suffix}`,
		bat08: `${prefix}${Spacing.bat08}${suffix}`,
		cat12: `${prefix}${Spacing.cat12}${suffix}`,
		dog16: `${prefix}${Spacing.dog16}${suffix}`,
		elf24: `${prefix}${Spacing.elf24}${suffix}`,
		fan32: `${prefix}${Spacing.fan32}${suffix}`,
		guy40: `${prefix}${Spacing.guy40}${suffix}`,
		hut56: `${prefix}${Spacing.hut56}${suffix}`,
		inn64: `${prefix}${Spacing.inn64}${suffix}`,
	};
}

export const spacingShort = {
	vertical: createSpacingShort('', ' 0'),
	horizontal: createSpacingShort('0 ', ''),
	top: createSpacingShort('', ' 0 0 0'),
	right: createSpacingShort('0 ', ' 0 0'),
	bottom: createSpacingShort('0 0 ', ' 0'),
	left: createSpacingShort('0 0 0 ', ''),
};

function createMargin(margin: string) {
	return tStyled.div`
		margin: ${margin};
	`;
}

export const Margin = {
	Ant04: createMargin(Spacing.ant04),
	Bat08: createMargin(Spacing.bat08),
	Cat12: createMargin(Spacing.cat12),
	Dog16: createMargin(Spacing.dog16),
	Elf24: createMargin(Spacing.elf24),
	Fan32: createMargin(Spacing.fan32),
	Guy40: createMargin(Spacing.guy40),
	Hut56: createMargin(Spacing.hut56),
	Inn64: createMargin(Spacing.inn64),
};

function createPadding(padding: string) {
	return tStyled.div`
		padding: ${padding};
	`;
}

export const Padding = {
	Ant04: createPadding(Spacing.ant04),
	Bat08: createPadding(Spacing.bat08),
	Cat12: createPadding(Spacing.cat12),
	Dog16: createPadding(Spacing.dog16),
	Elf24: createPadding(Spacing.elf24),
	Fan32: createPadding(Spacing.fan32),
	Guy40: createPadding(Spacing.guy40),
	Hut56: createPadding(Spacing.hut56),
	Inn64: createPadding(Spacing.inn64),
};

function createBlock(spacing: string) {
	return tStyled.div`
		width: ${spacing};
		height: ${spacing};
		flex-shrink: 0;
	`;
}

export const Block = {
	Ant04: createBlock(Spacing.ant04),
	Bat08: createBlock(Spacing.bat08),
	Cat12: createBlock(Spacing.cat12),
	Dog16: createBlock(Spacing.dog16),
	Elf24: createBlock(Spacing.elf24),
	Fan32: createBlock(Spacing.fan32),
	Guy40: createBlock(Spacing.guy40),
	Hut56: createBlock(Spacing.hut56),
	Inn64: createBlock(Spacing.inn64),
};
