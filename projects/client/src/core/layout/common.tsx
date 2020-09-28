import * as React from 'react';
import { tStyled, tCss, StyledFC } from '../style/styled';
import { StyledComponent } from 'styled-components';
import { Theme, ThemePickColor } from '../style/theme';
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

export interface LayoutAlignProps { }
export const LayoutAlign: React.FC<LayoutAlignProps> = (props) => {
	const { children } = props;

	const windowLayout = useWindowLayout();
	const isMobile = windowLayout.widthBreakpoint <= LayoutBreakpoint.mobileLarge;
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
	textAlign?: string | null;
	isRelative?: boolean;
	isInline?: boolean;
	backgroundColor?: ThemePickColor;
}

export const Spacing: StyledFC<SpacingProps> = (props) => {
	const { className, as, children, show, margin, padding, textAlign, isRelative, isInline, backgroundColor } = props;

	if ((show !== undefined) && (!show || !children)) {
		return null;
	}

	return (
		<InternalSpacing
			className={className}
			as={as}
			dataMargin={margin}
			dataPadding={padding}
			dataTextAlign={textAlign}
			isRelative={isRelative}
			isInline={isInline}
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
	dataTextAlign?: string | null;
	dataBackgroundColor?: ThemePickColor;
}

const relativeStyle = tCss`
	position: relative;
`;

const inlineBlockStyle = tCss`
	display: inline-block;
`;

export const InternalSpacing = tStyled.div<InternalSpacingProps>`
	vertical-align: top;

	${p => p.dataMargin && ('margin: ' + p.dataMargin + ';')}
	${p => p.dataPadding && ('padding: ' + p.dataPadding + ';')}

	${p => p.isRelative && relativeStyle}
	${p => p.isInline && inlineBlockStyle}

	${p => p.dataTextAlign && ('text-align: ' + p.dataTextAlign + ';')}

	${p => p.dataBackgroundColor && ('background-color: ' + p.dataBackgroundColor(p.theme.color) + ';')}
`;