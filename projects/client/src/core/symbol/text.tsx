import * as React from 'react';
import { tStyled, tCss } from '@/core/style/styled';
import { defaultFontSize, FontWeight, ThemePickColor } from '../style/theme';
import { SpacingProps, Spacing } from '../layout/common';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { useWindowLayout } from '@messman/react-common';

export interface TextProps extends SpacingProps {
	fontSize?: string | null;
	fontWeight?: string | number | null;
	isItalic?: boolean;
	color?: ThemePickColor;
}


interface BaseTextProps extends SpacingProps {
	$fontSize?: string | null;
	$fontWeight?: string | number | null;
	$isItalic?: boolean;
	$color?: ThemePickColor;
}

const italicStyle = tCss`
	font-style: italic;
`;

export const BaseText = tStyled(Spacing) <BaseTextProps>`
	/* EM value may be font-specific! */
	svg {
		margin-top: .1em;
	}

	${p => p.$fontSize && ('font-size: ' + p.$fontSize + ';')}
	${p => p.$fontWeight && ('font-weight: ' + p.$fontWeight + ';')}
	${p => p.$isItalic && italicStyle}
	${p => p.$color && ('color: ' + p.$color(p.theme.color) + ';')}
`;

export function createTextComponent(asElement: keyof JSX.IntrinsicElements, defaultFontSize: string, defaultFontWeight: number | string, defaultColor: ThemePickColor) {
	const component: React.FC<TextProps> = (props) => {
		const { fontSize, fontWeight, isItalic, color, ...otherProps } = props;

		return (
			<BaseText $fontSize={fontSize} $fontWeight={fontWeight} $isItalic={isItalic} $color={color} forwardedAs={asElement} {...otherProps as unknown} />
		);
	};
	component.defaultProps = {
		fontSize: defaultFontSize,
		fontWeight: defaultFontWeight,
		color: defaultColor
	};
	return component;
}

export enum FontSize {
	heading1 = '2rem',
	heading2 = '1.5rem',
	heading3 = '1.2rem',
	textRegular = '1rem',
	textSmall = '.875rem'
}

export const FreeText = createTextComponent('div', FontSize.textRegular, FontWeight.medium, c => c.textRegular);
export const Heading1 = createTextComponent('h1', FontSize.heading1, FontWeight.bold, c => c.textHeading1);
export const Heading2 = createTextComponent('h2', FontSize.heading2, FontWeight.bold, c => c.textHeading3);
export const Heading3 = createTextComponent('h3', FontSize.heading3, FontWeight.bold, c => c.textHeading3);
export const RegularText = createTextComponent('p', FontSize.textRegular, FontWeight.medium, c => c.textRegular);
export const SmallText = createTextComponent('small', FontSize.textSmall, FontWeight.medium, c => c.textRegular);

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
	background-color: ${p => p.theme.color.accent};
`;