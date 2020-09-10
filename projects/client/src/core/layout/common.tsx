import * as React from 'react';
import { tStyled, tCss } from '../style/styled';
import { DefaultLayoutBreakpoint, FlexColumn, FlexRow } from '@messman/react-common';
import { StyledComponent } from 'styled-components';
import { Theme, ThemePickColor } from '../style/theme';

/** A flex column whose width is the screen width, not the width decided by flex rules. */
export const ScreenWidthFlexColumn = tStyled(FlexColumn)`
	width: 100vw;
	max-width: ${DefaultLayoutBreakpoint.regular}px;
`;

export const ApplicationMaxWidth = tStyled.div`
	max-width: ${DefaultLayoutBreakpoint.wide}px;
	margin-left: auto;
	margin-right: auto;
`;
export const TextContentMaxWidth = tStyled.div`
	max-width: ${DefaultLayoutBreakpoint.regular}px;
`;

/** A flex column whose width is the Regular Layout Breakpoint Size. */
export const RegularWidthFlexColumn = tStyled(FlexColumn)`
	width: ${DefaultLayoutBreakpoint.regular}px;
`;

/** A Flex Row that has overflow: auto, so it scrolls if its width is greater than its parent. */
export const OverflowAutoFlexRow = tStyled(FlexRow)`
	overflow: auto;
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
	/** For section separation. 3rem / 48px. */
	large: createSpacing('3rem'),
	/** For large screen space. 5rem / 80px. */
	grand: createSpacing('5rem'),
};

/** Returns a new component that has the specified padding value. */
export function addPadding<T extends StyledComponent<any, Theme, {}, never>>(component: T, padding: string) {
	return tStyled(component)`
		padding: ${padding};
	`;
}

/** Returns a new component that has the specified margin value. */
export function addMargin<T extends StyledComponent<any, Theme, {}, never>>(component: T, margin: string) {
	return tStyled(component)`
		margin: ${margin};
	`;
}

export interface SpacingProps {
	className?: string;
	show?: any;
	margin?: string | null;
	padding?: string | null;
	fontSize?: string | null;
	isInline?: boolean;
	isBold?: boolean;
	isItalic?: boolean;
	color?: ThemePickColor;
	backgroundColor?: ThemePickColor;
}

export const Spacing: React.FC<SpacingProps> = (props) => {
	const { className, children, show, margin, padding, fontSize, isInline, isBold, isItalic, color, backgroundColor } = props;

	if ((show !== undefined) && (!show || !children)) {
		return null;
	}

	return (
		<InternalSpacing
			className={className}
			dataMargin={margin}
			dataPadding={padding}
			fontSize={fontSize}
			isInline={isInline}
			isBold={isBold}
			isItalic={isItalic}
			dataColor={color}
			dataBackgroundColor={backgroundColor}>
			{children}
		</InternalSpacing>
	);
};

interface InternalSpacingProps {
	dataMargin?: string | null;
	dataPadding?: string | null;
	isRelative?: boolean;
	isInline?: boolean;
	fontSize?: string | null;
	isBold?: boolean;
	isItalic?: boolean;
	dataColor?: ThemePickColor;
	dataBackgroundColor?: ThemePickColor;
}

const relativeStyle = tCss`
	position: relative;
`;

const inlineBlockStyle = tCss`
	display: inline-block;
`;

const boldStyle = tCss`
	font-weight: 500;
`;

const italicStyle = tCss`
	font-style: italic;
`;


export const InternalSpacing = tStyled.div<InternalSpacingProps>`
	vertical-align: top;

	/* EM value may be font-specific! */
	svg {
		margin-top: .1em;
	}

	${p => p.dataMargin && ('margin: ' + p.dataMargin + ';')}
	${p => p.dataPadding && ('padding: ' + p.dataPadding + ';')}

	${p => p.isRelative && relativeStyle}
	${p => p.isInline && inlineBlockStyle}

	${p => p.fontSize && ('font-size: ' + p.fontSize + ';')}
	${p => p.isBold && boldStyle}
	${p => p.isItalic && italicStyle}

	${p => p.dataColor && ('color: ' + p.dataColor(p.theme.color) + ';')}
	${p => p.dataBackgroundColor && ('background-color: ' + p.dataBackgroundColor(p.theme.color) + ';')}
`;