// Handles the rendering of a quote.

import * as React from 'react';
import { styled } from '@/core/style/styled';
import { Text } from '@/core/symbol/text';

export interface QuoteProps {
	text: string;
	attribution: string | null;
}

const QuoteStart = styled.span`
	font-weight: 500;
	display: inline-block;
`;

const QuoteEnd = styled.span`
	font-weight: 500;
	display: inline-block;
	margin-left: .2rem;
	white-space: nowrap;
`;

const QuoteText = styled.span`
	font-style: italic;
`;

const QuoteAttribution = styled.div`
	margin-top: .3rem;
	margin-left: 2rem;
`;

export const Quote: React.FC<QuoteProps> = (props) => {
	const { text, attribution } = props;

	const attribComponent = attribution ? <QuoteAttribution>&mdash; {attribution}</QuoteAttribution> : null;

	return (
		<>
			<Text>
				<QuoteStart>&ldquo;</QuoteStart>
				<QuoteText>{text}</QuoteText>
				<QuoteEnd>&rdquo;</QuoteEnd>
			</Text>
			{attribComponent}
		</>
	);
};