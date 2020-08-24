import { styled, css } from '@/core/style/styled';

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
}

function createTextComponent(fontSize: string) {
	return styled.div<TextProps>`
		${commonTextStyle}
		font-size: ${fontSize};
		display: ${p => p.isInline ? 'inline-block' : 'block'};
		font-weight: ${p => p.isBold ? '600' : '400'};
	`;
}

// Default 1rem = 16px
export const titleHeight = '2rem';
/** Title. 2rem / 32px. */
export const Title = createTextComponent(titleHeight);

export const subtitleHeight = '1.25rem';
/** Subtitle. 1.25rem / 20px. */
export const Subtitle = createTextComponent(subtitleHeight);

export const textHeight = '1rem';
/** Regular text. 1rem / 16px. */
export const Text = createTextComponent(textHeight);

export const smallTextHeight = '.875rem';
/** Small text. .875rem / 14px. */
export const SmallText = createTextComponent(smallTextHeight);

export const subTextHeight = '.75rem';
/** Sub text. .75rem / 12px. */
export const SubText = createTextComponent(subTextHeight);

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
	background-color: ${p => p.theme.color.primary};
`;