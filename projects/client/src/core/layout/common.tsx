import * as React from 'react';
import { tStyled, StyledFC } from '../style/styled';
import { LayoutBreakpoint, lineBreakpoint } from '@/services/layout/window-layout';
import { useWindowLayout } from '@messman/react-common';

export const ApplicationMaxWidth = tStyled.div`
	max-width: ${LayoutBreakpoint.max}px;
	margin-left: auto;
	margin-right: auto;
`;
export const LineMaxWidth = tStyled.div`
	max-width: ${lineBreakpoint};
`;
export const LineMaxWidthCenter = tStyled.div`
	max-width: ${lineBreakpoint};
	margin-left: auto;
	margin-right: auto;
	text-align: center;
`;
export const TextCenter = tStyled.div`
	text-align: center;
`;

export function useResponsiveEdgeSpacing(): Spacing {

	const { widthBreakpoint } = useWindowLayout();

	if (widthBreakpoint <= LayoutBreakpoint.mobileLarge) {
		return spacing.medium;
	}
	return spacing.large;
}

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
	/** For separation of lines of text. .1875rem */
	nudge: createSpacing('.1875rem'),
	/** For edges against a small screen. .5rem */
	small: createSpacing('.5rem'),
	/** For vertical flow. .875rem */
	medium: createSpacing('.875rem'),
	/** For section separation. 2.2rem */
	large: createSpacing('2.2rem'),
	/** For large screen space. 4.5rem */
	grand: createSpacing('4.5rem'),
};

const TopMarginNudge = tStyled.div`
	margin-top: ${spacing.nudge.value};
`;

const TopMarginSmall = tStyled.div`
	margin-top: ${spacing.small.value};
`;

const TopMarginMedium = tStyled.div`
	margin-top: ${spacing.medium.value};
`;

const TopMarginLarge = tStyled.div`
	margin-top: ${spacing.large.value};
`;

const TopMarginGrand = tStyled.div`
	margin-top: ${spacing.grand.value};
`;

export const TopMargin = {
	Nudge: TopMarginNudge,
	Small: TopMarginSmall,
	Medium: TopMarginMedium,
	Large: TopMarginLarge,
	Grand: TopMarginGrand
};

export interface DividerProps {
	dataSpacing: string;
}

export const Divider = tStyled.div<DividerProps>`
	flex: none;
	height: ${p => p.dataSpacing};
`;

export const VerticalDivider = tStyled.div<DividerProps>`
	flex: none;
	width: ${p => p.dataSpacing};
`;

export interface SpacingProps {
	className?: string;
	show?: any;
	margin?: string | null;
	padding?: string | null;
	textAlign?: string | null;
	isRelative?: boolean;
	isInline?: boolean;
}

export const Spacing: StyledFC<SpacingProps> = (props) => {
	const { className, as, children, show, margin, padding, textAlign, isRelative, isInline } = props;

	if ((show !== undefined) && (!show || !children)) {
		return null;
	}

	return (
		<InternalSpacing
			className={className}
			as={as}
			$margin={margin}
			$padding={padding}
			$isRelative={isRelative}
			$isInline={isInline}
			$textAlign={textAlign}
		>
			{children}
		</InternalSpacing>
	);
};

interface InternalSpacingProps {
	$margin?: string | null;
	$padding?: string | null;
	$isRelative?: boolean;
	$isInline?: boolean;
	$textAlign?: string | null;
}

export const InternalSpacing = tStyled.div.attrs((p: InternalSpacingProps) => {
	const style: Partial<CSSStyleDeclaration> = {};

	if (p.$margin) {
		style.margin = p.$margin;
	}
	if (p.$padding) {
		style.padding = p.$padding;
	}
	if (p.$isRelative) {
		style.position = 'relative';
	}
	if (p.$isInline) {
		style.display = 'inline-block';
	}
	if (p.$textAlign) {
		style.textAlign = p.$textAlign;
	}

	return {
		style: style
	};
})`
	vertical-align: top;
`;