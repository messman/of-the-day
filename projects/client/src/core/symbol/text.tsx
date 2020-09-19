import * as React from 'react';
import { tStyled, tCss } from '@/core/style/styled';
import { ThemePickColor } from '../style/theme';
import { SpacingProps, Spacing } from '../layout/common';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { useWindowLayout } from '@messman/react-common';

export interface TextProps extends Omit<SpacingProps, 'fontSize'> {
}

export function createTextComponent(fontSize: string, defaultColor: ThemePickColor, defaultIsBold: boolean) {
	const component: React.FC<TextProps> = (props) => {
		let { isBold, color, ...otherProps } = props;
		isBold = isBold === undefined ? defaultIsBold : isBold;
		color = color === undefined ? defaultColor : color;
		return (
			<Spacing fontSize={fontSize} isBold={isBold} color={color} {...otherProps} />
		);
	};
	return component;
}

export const defaultFontSize = '16px';

export const FontSizeManager: React.FC = (props) => {
	const windowLayout = useWindowLayout();
	const { widthBreakpoint } = windowLayout;

	React.useEffect(() => {
		let fontSize = defaultFontSize;
		if (widthBreakpoint >= LayoutBreakpoint.wide) {
			fontSize = '20px';
		}
		if (widthBreakpoint >= LayoutBreakpoint.tablet) {
			fontSize = '18px';
		}
		document.documentElement.style.fontSize = fontSize;
	}, [widthBreakpoint]);

	return <>{props.children}</>;
};

// Default 1rem = 16px, but see theme for changes

export const grandTitleHeight = '3.5rem';
/** Title. 3.5rem / 56px. */
export const GrandTitle = createTextComponent(grandTitleHeight, c => c.textTitle, true);

export const titleHeight = '1.75rem';
/** Title. 1.75rem / 28px. */
export const Title = createTextComponent(titleHeight, c => c.textTitle, true);

export const subtitleHeight = '1.5rem';
/** Subtitle. 1.5rem / 24px. */
export const Subtitle = createTextComponent(subtitleHeight, c => c.textSubtitle, false);

export const regularTextHeight = '1rem';
/** Regular text. 1rem / 16px. */
export const RegularText = createTextComponent(regularTextHeight, c => c.textRegular, false);

export const smallTextHeight = '.875rem';
/** Small text. .875rem / 14px. */
export const SmallText = createTextComponent(smallTextHeight, c => c.textRegular, false);

export const subTextHeight = '.75rem';
/** Sub text. .75rem / 12px. */
export const SubText = createTextComponent(subTextHeight, c => c.textRegular, false);

export const Text = {
	GrandTitle,
	Title,
	Subtitle,
	RegularText,
	SmallText,
	SubText
};

const textBoxStyle = tCss`
	font-size: 1rem;
	font-weight: 300;
	margin: 0;
	margin-top: 1.2rem;
	padding: .5rem;
	padding-bottom: 2rem;
`;

export const BadText = tStyled.p`
	${textBoxStyle}
	background-color: ${p => p.theme.color.warning};
`;

export const ImportantText = tStyled.p`
	${textBoxStyle}
	background-color: ${p => p.theme.color.primary};
`;