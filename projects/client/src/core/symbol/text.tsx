import * as React from 'react';
import { ThemedCSS, tStyled } from '@/core/style/styled';
import { FontWeight } from '../style/theme';
import { lineBreakpoint } from '@/services/layout/window-layout';
import { css } from 'styled-components';

// Defaults for headings: 2, 1.5, 1.17, 1, ....
export enum FontSize {
	heading1 = '2rem',
	heading2 = '1.5rem',
	heading3 = '1.25rem',
	lead = '1rem',
	regular = '1rem',
	small = '.875rem'
}

export const fontDeclarations: Record<keyof typeof FontSize, ThemedCSS> = {
	heading1: css`
		font-size: ${FontSize.heading1};
		line-height: ${FontSize.heading1};
		font-weight: ${FontWeight.bold};
	`,
	heading2: css`
		font-size: ${FontSize.heading2};
		line-height: ${FontSize.heading2};
		font-weight: ${FontWeight.bold};
	`,
	heading3: css`
		font-size: ${FontSize.heading3};
		line-height: ${FontSize.heading3};
		font-weight: ${FontWeight.bold};
	`,
	lead: css`
		font-size: ${FontSize.lead};
		line-height: ${FontSize.lead};
		font-weight: ${FontWeight.bold};
	`,
	regular: css`
		font-size: ${FontSize.regular};
		line-height: ${FontSize.regular};
		font-weight: ${FontWeight.regular};
	`,
	small: css`
		font-size: ${FontSize.small};
		line-height: ${FontSize.small};
		font-weight: ${FontWeight.regular};
	`,
};

export const lineHeights = {
	body: css`
		line-height: '1.5rem';
	`,
};

export const Heading1 = tStyled.div`
	${fontDeclarations.heading1};
`;

export const Heading2 = tStyled.div`
	${fontDeclarations.heading2};
`;

export const Heading3 = tStyled.div`
	${fontDeclarations.heading3};
`;

export const LeadText = tStyled.strong`
	${fontDeclarations.lead};
`;

export const RegularText = tStyled.div`
	${fontDeclarations.regular};
	color: ${p => p.theme.textSubtle};
`;

export const SmallText = tStyled.div`
	${fontDeclarations.small};
	color: ${p => p.theme.textSubtle};
`;

export const BodyText = tStyled.div`
	${fontDeclarations.regular};
	${lineHeights.body};
	color: ${p => p.theme.textSubtle};
`;

export const InlineItalic = tStyled.span`
	display: inline;
	font-style: italic;
`;

export const InlineWeight = {
	Medium: tStyled.span`
		display: inline;
		font-weight: ${FontWeight.regular};
	`,
	Bold: tStyled.span`
		display: inline;
		font-weight: ${FontWeight.medium};
	`,
	ExtraBold: tStyled.span`
		display: inline;
		font-weight: ${FontWeight.bold};
	`
};

/*
	Versions of the text components above, with default margins.
*/

export const Title = tStyled.h1`
`;

export const Subtitle = tStyled.h2`
	
`;

export const Paragraph = tStyled.p`
	max-width: ${lineBreakpoint};
`;

export const ParagraphCenterContainer = tStyled.div`
	margin: 0 auto;
	text-align: center;
`;

export const ParagraphCenter: React.FC = (props) => {
	return (
		<ParagraphCenterContainer>
			<Paragraph>{props.children}</Paragraph>
		</ParagraphCenterContainer>
	);
};