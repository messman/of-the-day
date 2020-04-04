// Handles the rendering of a quote.

import * as React from "react";
import * as Common from "@/styles/common";
import styled from "@/styles/theme";

export interface QuoteProps {
	text: string,
	attribution: string
}

const QuoteStart = styled.span`
	font-weight: 600;
	display: inline-block;
`;

const QuoteEnd = styled.span`
	font-weight: 600;
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
			<Common.Text>
				<QuoteStart>&ldquo;</QuoteStart>
				<QuoteText>{text}</QuoteText>
				<QuoteEnd>&rdquo;</QuoteEnd>
			</Common.Text>
			{attribComponent}
		</>
	);
}
