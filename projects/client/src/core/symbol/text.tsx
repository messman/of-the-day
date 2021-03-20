import { tStyled } from '@/core/style/styled';
import { FontWeight } from '../style/theme';
import { Spacing } from '../layout/common';
import { lineBreakpoint } from '@/services/layout/window-layout';
import { css } from 'styled-components';

// EM value may be font-specific!
const baseTextStyle = css`
	margin: 0;
	padding: 0;

	svg {
		margin-top: .1em;
	}
`;

// Defaults for headings: 2, 1.5, 1.17, 1, ....
export enum FontSize {
	heading1 = '2rem',
	heading2 = '1.5rem',
	heading3 = '1.25rem',
	textRegular = '1rem',
	textSmall = '.875rem'
}

export const Heading1 = tStyled.h1`
	${baseTextStyle};
	font-size: ${FontSize.heading1};
	font-weight: ${FontWeight.bold};
	color: ${p => p.theme.color.textHeading1};
`;

export const Heading2 = tStyled.h2`
	${baseTextStyle};
	font-size: ${FontSize.heading2};
	font-weight: ${FontWeight.bold};
`;

export const Heading3 = tStyled.h3`
	${baseTextStyle};
	font-size: ${FontSize.heading3};
	font-weight: ${FontWeight.bold};
`;

export const RegularText = tStyled.div`
	${baseTextStyle};
	font-size: ${FontSize.textRegular};
	font-weight: ${FontWeight.medium};
`;

export const SmallText = tStyled.div`
	${baseTextStyle};
	font-size: ${FontSize.textSmall};
	font-weight: ${FontWeight.medium};
`;

export interface InlineWeightProps {
	fontWeight: FontWeight;
}

export const InlineItalic = tStyled.span`
	display: inline;
	font-style: italic;
`;

const InlineMedium = tStyled.span`
	display: inline;
	font-weight: ${FontWeight.medium};
`;

const InlineBold = tStyled.span`
	display: inline;
	font-weight: ${FontWeight.bold};
`;

const InlineExtraBold = tStyled.span`
	display: inline;
	font-weight: ${FontWeight.extraBold};
`;

export const InlineWeight = {
	Medium: InlineMedium,
	Bold: InlineBold,
	ExtraBold: InlineExtraBold
};

/*
	Versions of the text components above, with default margins.
*/

export const Title = tStyled(Heading1)`
	margin-top: ${Spacing.guy40};
`;

export const Subtitle = tStyled(Heading2)`
	margin-top: ${Spacing.elf24};
`;

export const Paragraph = tStyled(RegularText)`
	margin: ${Spacing.dog16};
	max-width: ${lineBreakpoint};
`;