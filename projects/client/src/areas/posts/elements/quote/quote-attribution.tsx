import * as React from 'react';
import { RegularText } from '@/core/symbol/text';
import { Spacing } from '@/core/layout/common';
import { OutLink } from '@/core/link';
import { tStyled } from '@/core/style/styled';
import { InnerQuoteProps } from './quote-inner';

export const QuoteAttribution: React.FC<InnerQuoteProps> = (props) => {
	const { quote } = props;
	const { sourceText, sourceLink, aVoice, bVoice } = quote;

	if (!sourceText && !aVoice) {
		return null;
	}

	let isLinkFirst = false;
	let sourceRender: JSX.Element | string = null!;
	if (sourceLink) {
		isLinkFirst = true;
		sourceRender = <OutLink href={sourceLink}>{sourceText}</OutLink>;
	}
	else {
		isLinkFirst = false;
		sourceRender = sourceText;
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
		<RightText>{dashPrefix}{attributionRender}</RightText>
	);
};

const RightText = tStyled(RegularText)`
	text-align: right;
	word-wrap: break-word;
	margin-top: ${Spacing.dog16};
	padding-left: ${Spacing.elf24};
`;