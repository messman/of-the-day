import * as React from 'react';
import { QuoteProps } from './quote';
import { RegularText } from '@/core/symbol/text';
import { Spacing, spacing } from '@/core/layout/common';
import { FlexRow, FlexColumn } from '@messman/react-common';
import { QuoteAttribution } from './quote-attribution';
import { QuotePiece } from './quote-piece';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { tStyled } from '@/core/style/styled';
import { separatorThickness } from '@/core/style/common';

/** Controls the inner content of the quote based on quote properties. */
export const InnerQuote: React.FC<QuoteProps> = (props) => {
	const { quote } = props;
	const { a, b } = quote;

	// We need at least the text of the first voice.
	if (!a) {
		return null;
	}

	if (!b) {
		return <InnerSingleQuote quote={quote} />;
	}
	return <InnerMultiQuote quote={quote} />;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

export const InnerSingleQuote: React.FC<QuoteProps> = (props) => {
	const { quote } = props;
	const { a } = quote;

	return (
		<FlexRow justifyContent='center'>
			<SingleQuoteWidthControlContainer flex='none'>
				<QuotePiece isLarge={true} text={a} align='center' />
				<QuoteAttribution quote={quote} />
			</SingleQuoteWidthControlContainer>
		</FlexRow>
	);
};

const SingleQuoteWidthControlContainer = tStyled(FlexColumn)`
	max-width: min(${LayoutBreakpoint.tablet}px, 100%);
	min-width: 15rem;
`;

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

export const InnerMultiQuote: React.FC<QuoteProps> = (props) => {
	const { quote } = props;
	const { a, aVoice, b, bVoice } = quote;

	const gapSpacing = bVoice ? spacing.large : spacing.medium;

	return (
		<FlexRow justifyContent='center'>
			<MultiQuoteWidthControlContainer flex='none'>
				<FlexRow>
					<Divider />
					<MarginFlexColumn>
						<MultiQuotePiece text={a} voice={aVoice} isSecondVoice={false} />
						<Spacing margin={gapSpacing.top} />
						<MultiQuotePiece text={b} voice={bVoice} isSecondVoice={true} />
					</MarginFlexColumn>
					<Divider />
				</FlexRow>
				<QuoteAttribution quote={quote} />
			</MultiQuoteWidthControlContainer>
		</FlexRow>
	);
};

const Divider = tStyled.div`
	width: ${separatorThickness};
	background-color: ${p => p.theme.color.bgComponent3};
`;

const MultiQuoteWidthControlContainer = tStyled(FlexColumn)`
	max-width: min(${LayoutBreakpoint.desktop}px, 100%);
	min-width: 20rem;
`;

const MarginFlexColumn = tStyled(FlexColumn)`
	margin: ${spacing.small.value};
`;

interface MultiQuotePieceProps {
	text: string;
	voice: string;
	isSecondVoice: boolean;
}

const MultiQuotePiece: React.FC<MultiQuotePieceProps> = (props) => {
	const { text, voice, isSecondVoice } = props;

	let voiceRender: JSX.Element | null = null;
	if (voice) {
		const voiceLabel = voice + ':';
		voiceRender = (
			<RegularText margin={spacing.small.bottom}>{voiceLabel}</RegularText>
		);
	}

	const justify = isSecondVoice ? 'flex-end' : 'flex-start';
	const leftRender = isSecondVoice ? <QuoteSpacing /> : null;
	const rightRender = isSecondVoice ? null : <QuoteSpacing />;

	return (
		<FlexRow justifyContent={justify}>
			{leftRender}
			<div>
				{voiceRender}
				<QuotePiece isLarge={false} text={text} align='left' />
			</div>
			{rightRender}
		</FlexRow>
	);
};

const QuoteSpacing = tStyled.div`
	width: 5rem;
	flex: 0 0 auto;
`;
