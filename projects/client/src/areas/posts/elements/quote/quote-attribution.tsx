import * as React from 'react';
import { QuoteProps } from './quote';
import { RegularText } from '@/core/symbol/text';
import { Spacing, spacing } from '@/core/layout/common';
import { OutLink } from '@/core/link';
import { tStyled } from '@/core/style/styled';

export const QuoteAttribution: React.FC<QuoteProps> = (props) => {
	const { quote } = props;
	const { source, sourceLink, aVoice, bVoice } = quote;

	if (!source) {
		return null;
	}

	let sourceRender: JSX.Element | string = null!;
	if (sourceLink) {
		sourceRender = <OutLink href={sourceLink}>{source}</OutLink>;
	}
	else {
		sourceRender = source;
	}

	let attributionRender: JSX.Element | string = sourceRender;

	const singleVoice = bVoice ? null : (aVoice || null);
	if (singleVoice) {
		if (sourceRender) {
			attributionRender = <>{singleVoice}, {sourceRender}</>;
		}
		else {
			attributionRender = singleVoice;
		}
	}

	return (
		<Right margin={spacing.small.top}>
			<RegularText>&mdash;&#8288;&nbsp;&#8288;{attributionRender}</RegularText>
		</Right>
	);
};

const Right = tStyled(Spacing)`
	text-align: right;
	word-wrap: break-word;
	padding-left: ${spacing.large.value};
`;