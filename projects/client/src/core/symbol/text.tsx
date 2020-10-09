import * as React from 'react';
import { tStyled, tCss } from '@/core/style/styled';
import { defaultFontSize, FontWeight, ThemePickColor } from '../style/theme';
import { SpacingProps, Spacing, spacing } from '../layout/common';
import { LayoutBreakpoint, lineBreakpoint } from '@/services/layout/window-layout';
import { useWindowLayout } from '@messman/react-common';

export interface TextProps extends SpacingProps {
	fontSize?: string | null;
	fontWeight?: string | number | null;
	isItalic?: boolean;
	color?: ThemePickColor;
	/** Defaults to true. */
	isMaxLineLength?: boolean;
}


interface BaseTextProps extends SpacingProps {
	$fontSize?: string | null;
	$fontWeight?: string | number | null;
	$isItalic?: boolean;
	$color?: ThemePickColor;
	$isMaxLineLength?: boolean;
}

const italicStyle = tCss`
	font-style: italic;
`;

// EM value may be font-specific!
const iconTextOffsetStyle = tCss`
	margin-top: .1em;
`;

export const BaseText = tStyled(Spacing) <BaseTextProps>`
	/* EM value may be font-specific! */
	svg {
		${iconTextOffsetStyle}
	}

	${p => p.$fontSize && ('font-size: ' + p.$fontSize + ';')}
	${p => p.$fontWeight && ('font-weight: ' + p.$fontWeight + ';')}
	${p => p.$isItalic && italicStyle}
	${p => p.$color && ('color: ' + p.$color(p.theme.color) + ';')}
	${p => (p.$isMaxLineLength === undefined || !!p.$isMaxLineLength) && ('max-width: ' + lineBreakpoint + ';')}
`;

export function createTextComponent(asElement: keyof JSX.IntrinsicElements, defaultFontSize: string, defaultFontWeight: number | string, defaultColor: ThemePickColor) {
	const component: React.FC<TextProps> = (props) => {
		const { fontSize, fontWeight, isItalic, isMaxLineLength, color, ...otherProps } = props;

		return (
			<BaseText $fontSize={fontSize} $fontWeight={fontWeight} $isItalic={isItalic} $isMaxLineLength={isMaxLineLength} $color={color} forwardedAs={asElement} {...otherProps as unknown} />
		);
	};
	component.defaultProps = {
		fontSize: defaultFontSize,
		fontWeight: defaultFontWeight,
		color: defaultColor
	};
	return component;
}

// Defaults for headings: 2, 1.5, 1.17, 1, ....
export enum FontSize {
	heading1 = '1.8rem',
	heading2 = '1.4rem',
	heading3 = '1.15rem',
	textRegular = '1rem',
	textSmall = '.875rem'
}

export const FreeText = createTextComponent('div', FontSize.textRegular, FontWeight.medium, c => c.textRegular);
export const Heading1 = createTextComponent('h1', FontSize.heading1, FontWeight.bold, c => c.textHeading1);
export const Heading2 = createTextComponent('h2', FontSize.heading2, FontWeight.bold, c => c.textHeading3);
export const Heading3 = createTextComponent('h3', FontSize.heading3, FontWeight.bold, c => c.textHeading3);
export const RegularText = createTextComponent('p', FontSize.textRegular, FontWeight.medium, c => c.textRegular);
// Don't use 'small' here because it is inline and we want block by default.
export const SmallText = createTextComponent('div', FontSize.textSmall, FontWeight.medium, c => c.textRegular);

export const FontSizeManager: React.FC = (props) => {
	const windowLayout = useWindowLayout();
	const { widthBreakpoint } = windowLayout;

	// As we shift into larger responsive screen sizes, increase font size.
	React.useEffect(() => {
		let fontSize = defaultFontSize;
		if (widthBreakpoint >= LayoutBreakpoint.desktop) {
			fontSize = '18px';
		}
		document.documentElement.style.fontSize = fontSize;
	}, [widthBreakpoint]);

	return <>{props.children}</>;
};

export const Title = tStyled(Heading1)`
	margin-top: ${spacing.grand.value};
`;

export const Subtitle = tStyled(Heading2)`
	margin-top: ${spacing.large.value};
`;

export const Paragraph = tStyled(RegularText)`
	margin: ${spacing.medium.vertical};
`;

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
	background-color: ${p => p.theme.color.textAccentOnBackground};
`;