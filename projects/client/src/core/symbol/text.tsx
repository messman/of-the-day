import { styled, css } from '@/core/style/styled';
import { ThemePickColor } from '../style/theme';

const commonTextStyle = css`
	vertical-align: top;

	/* EM value may be font-specific! */
	svg {
		margin-top: .1em;
	}
`;

export interface TextProps {
	isBold?: boolean;
	isInline?: boolean;
	dataColor?: ThemePickColor;
	margin?: string;
}

export function createTextComponent(fontSize: string, defaultColor: ThemePickColor) {
	return styled.div<TextProps>`
		${commonTextStyle};
		margin: ${p => p.margin || '0'};
		color: ${p => (p.dataColor || defaultColor)(p.theme.color)};
		font-size: ${fontSize};
		display: ${p => p.isInline ? 'inline-block' : 'block'};
		font-weight: ${p => p.isBold ? '500' : '400'};
	`;
}

// Default 1rem = 16px

export const grandTitleHeight = '3.5rem';
/** Title. 3.5rem / 56px. */
export const GrandTitle = createTextComponent(grandTitleHeight, c => c.textTitle);

export const titleHeight = '1.75rem';
/** Title. 1.75rem / 28px. */
export const Title = createTextComponent(titleHeight, c => c.textTitle);

export const subtitleHeight = '1.25rem';
/** Subtitle. 1.25rem / 20px. */
export const Subtitle = createTextComponent(subtitleHeight, c => c.textSubtitle);

export const textHeight = '1rem';
/** Regular text. 1rem / 16px. */
export const Text = createTextComponent(textHeight, c => c.text);

export const smallTextHeight = '.875rem';
/** Small text. .875rem / 14px. */
export const SmallText = createTextComponent(smallTextHeight, c => c.text);

export const subTextHeight = '.75rem';
/** Sub text. .75rem / 12px. */
export const SubText = createTextComponent(subTextHeight, c => c.text);

const textBoxStyle = css`
	font-size: 1rem;
	font-weight: 300;
	margin: 0;
	margin-top: 1.2rem;
	padding: .5rem;
	padding-bottom: 2rem;
`;

export const BadText = styled.p`
	${textBoxStyle}
	background-color: ${p => p.theme.color.warning};
`;

export const ImportantText = styled.p`
	${textBoxStyle}
	background-color: ${p => p.theme.color.primaryA};
`;