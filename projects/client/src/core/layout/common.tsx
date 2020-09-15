import * as React from 'react';
import { tStyled, tCss } from '../style/styled';
import { StyledComponent } from 'styled-components';
import { Theme, ThemePickColor } from '../style/theme';
import { grandTitleHeight } from '../symbol/text';
import { LayoutBreakpoint, lineBreakpoint } from '@/services/layout/window-layout';
import { useWindowLayout } from '@messman/react-common';

export const ApplicationMaxWidth = tStyled.div`
	max-width: ${LayoutBreakpoint.wide}px;
	margin-left: auto;
	margin-right: auto;
`;
export const LineMaxWidth = tStyled.div`
	max-width: ${lineBreakpoint};
`;

export interface LayoutAlignProps { }
export const LayoutAlign: React.FC<LayoutAlignProps> = (props) => {
	const { children } = props;

	const windowLayout = useWindowLayout();
	const isMobile = windowLayout.widthBreakpoint === LayoutBreakpoint.mobile;
	const align = isMobile ? 'left' : 'center';

	return (
		<ContentAlign dataAlign={align}>
			{children}
		</ContentAlign>
	);
};

interface ContentAlignProps {
	dataAlign: 'left' | 'center';
}

const ContentAlign = tStyled.div<ContentAlignProps>`
	max-width: ${lineBreakpoint};
	text-align: ${p => p.dataAlign};
	margin-left: ${p => p.dataAlign === 'left' ? '0' : 'auto'};
	margin-right: auto;
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
			dataFontSize={fontSize}
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
	dataFontSize?: string | null;
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
const extraBoldStyle = tCss`
	font-weight: 600;
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

	${p => p.dataFontSize && ('font-size: ' + p.dataFontSize + ';')}
	${p => p.isBold && (p.dataFontSize === grandTitleHeight ? extraBoldStyle : boldStyle)}
	${p => p.isItalic && italicStyle}

	${p => p.dataColor && ('color: ' + p.dataColor(p.theme.color) + ';')}
	${p => p.dataBackgroundColor && ('background-color: ' + p.dataBackgroundColor(p.theme.color) + ';')}
`;