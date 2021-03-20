import * as React from 'react';
import { RegularText } from '@/core/symbol/text';
import { Block, Spacing } from '@/core/layout/common';
import { FlexRow, FlexColumn } from '@messman/react-common';
import { QuoteAttribution } from './quote-attribution';
import { QuotePiece } from './quote-piece';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';
import { tStyled } from '@/core/style/styled';
import { separatorThickness } from '@/core/style/common';
import { IPostQuote } from 'oftheday-shared';

export interface InnerQuoteProps {
	quote: IPostQuote;
}

/** Controls the inner content of the quote based on quote properties. */
export const InnerQuote: React.FC<InnerQuoteProps> = (props) => {
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

export const InnerSingleQuote: React.FC<InnerQuoteProps> = (props) => {
	const { quote } = props;
	const { a } = quote;

	return (
		<FlexRow justifyContent='center'>
			<SingleQuoteWidthControlContainer>
				<QuotePiece isLarge={true} text={a} isLeftTextAlign={false} />
				<QuoteAttribution quote={quote} />
			</SingleQuoteWidthControlContainer>
		</FlexRow>
	);
};

const SingleQuoteWidthControlContainer = tStyled(FlexColumn)`
	max-width: min(${LayoutBreakpointRem.d40}rem, 100%);
	min-width: 12rem;
`;

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

export const InnerMultiQuote: React.FC<InnerQuoteProps> = (props) => {
	const { quote } = props;
	const { a, aVoice, b, bVoice } = quote;

	const GapSpacing = bVoice ? Block.Elf24 : Block.Dog16;

	return (
		<FlexRow justifyContent='center'>
			<MultiQuoteWidthControlContainer flex='none'>
				<FlexRow>
					<Divider />
					<MarginFlexColumn>
						<MultiQuotePiece text={a} voice={aVoice} isSecondVoice={false} />
						<GapSpacing />
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
	max-width: min(${LayoutBreakpointRem.f60}rem, 100%);
`;

const MarginFlexColumn = tStyled(FlexColumn)`
	margin: ${Spacing.bat08};
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
			<VoiceText>{voiceLabel}</VoiceText>
		);
	}

	const justify = isSecondVoice ? 'flex-end' : 'flex-start';
	const leftRender = isSecondVoice ? <QuoteSpacing /> : null;
	const rightRender = isSecondVoice ? null : <QuoteSpacing />;

	return (
		<FlexRow justifyContent={justify} flex='none'>
			{leftRender}
			<div>
				{voiceRender}
				<QuotePiece isLarge={false} text={text} isLeftTextAlign={true} />
			</div>
			{rightRender}
		</FlexRow>
	);
};

const QuoteSpacing = tStyled.div`
	width: 3rem;
	flex: 0 0 auto;
`;

const VoiceText = tStyled(RegularText)`
	margin-bottom: ${Spacing.dog16};
`;
