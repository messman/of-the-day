import * as React from 'react';
import { RegularText } from '@/core/symbol/text';
import { Spacing, spacing } from '@/core/layout/common';
import { OutLink } from '@/core/link';
import { tStyled } from '@/core/style/styled';
import { InnerQuoteProps } from './quote-inner';

export const QuoteAttribution: React.FC<InnerQuoteProps> = (props) => {
	const { quote } = props;
	const { source, sourceLink, aVoice, bVoice } = quote;

	if (!source) {
		return null;
	}

	let isLinkFirst = false;
	let sourceRender: JSX.Element | string = null!;
	if (sourceLink) {
		isLinkFirst = true;
		sourceRender = <OutLink href={sourceLink}>{source}</OutLink>;
	}
	else {
		isLinkFirst = false;
		sourceRender = source;
	}

	let attributionRender: JSX.Element | string = sourceRender;

	const singleVoice = bVoice ? null : (aVoice || null);
	if (singleVoice) {
		if (sourceRender) {
			isLinkFirst = false;
			attributionRender = <>{singleVoice}, {sourceRender}</>;
		}
		else {
			isLinkFirst = false;
			attributionRender = singleVoice;
		}
	}

	const dashPrefix = isLinkFirst ? null : (
		<>&mdash;&#8288;&nbsp;&#8288;</>
	);

	return (
		<Right margin={spacing.small.top}>
			<RegularText isMaxLineLength={false}>{dashPrefix}{attributionRender}</RegularText>
		</Right>
	);
};

const Right = tStyled(Spacing)`
	text-align: right;
	word-wrap: break-word;
	padding-left: ${spacing.large.value};
`;