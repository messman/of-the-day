import * as React from 'react';
import { tStyled, tCss } from '@/core/style/styled';
import { defaultFontSize, fontWeights, ThemePickColor } from '../style/theme';
import { SpacingProps, Spacing } from '../layout/common';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { useWindowLayout } from '@messman/react-common';

export interface TextProps extends Omit<SpacingProps, 'fontSize'> {
}

export function createTextComponent(fontSize: string, defaultColor: ThemePickColor, defaultFontWeight: number | string) {
	const component: React.FC<TextProps> = (props) => {
		let { fontWeight, color, ...otherProps } = props;
		fontWeight = fontWeight === undefined ? defaultFontWeight : fontWeight;
		color = color === undefined ? defaultColor : color;
		return (
			<TextSpacing fontSize={fontSize} fontWeight={fontWeight} color={color} {...otherProps} />
		);
	};
	return component;
}

const TextSpacing = tStyled(Spacing)`
	/* EM value may be font-specific! */
	svg {
		margin-top: .1em;
	}
`;

export const FontSizeManager: React.FC = (props) => {
	const windowLayout = useWindowLayout();
	const { widthBreakpoint } = windowLayout;

	// As we shift into larger responsive screen sizes, increase font size.
	React.useEffect(() => {
		let fontSize = defaultFontSize;
		if (widthBreakpoint >= LayoutBreakpoint.wide) {
			fontSize = '20px';
		}
		else if (widthBreakpoint >= LayoutBreakpoint.tablet) {
			fontSize = '18px';
		}
		document.documentElement.style.fontSize = fontSize;
	}, [widthBreakpoint]);

	return <>{props.children}</>;
};

export const titleHeight = '2rem';
/** Title. 2rem. */
export const Title = createTextComponent(titleHeight, c => c.textTitle, fontWeights.bold);

export const subtitleHeight = '1.5rem';
/** Subtitle. 1.5rem. */
export const Subtitle = createTextComponent(subtitleHeight, c => c.textSubtitle, fontWeights.medium);

export const regularTextHeight = '1rem';
/** Regular text. 1rem. */
export const RegularText = createTextComponent(regularTextHeight, c => c.textRegular, fontWeights.medium);

export const smallTextHeight = '.875rem';
/** Small text. .875rem. */
export const SmallText = createTextComponent(smallTextHeight, c => c.textRegular, fontWeights.medium);

export const subTextHeight = '.75rem';
/** Sub text. .75rem. */
export const SubText = createTextComponent(subTextHeight, c => c.textRegular, fontWeights.medium);

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