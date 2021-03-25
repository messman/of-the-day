import * as React from 'react';
import { Block, Spacing } from '@/core/layout/common';
import { FlexRow, FlexColumn } from '@messman/react-common';
import { QuoteAttribution } from './quote-attribution';
import { QuotePiece } from './quote-piece';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';
import { tStyled } from '@/core/style/styled';
import { IPostQuote } from 'oftheday-shared';
import { fontDeclarations } from '@/core/symbol/text';

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
				<QuotePiece isLarge={true} text={a} isForcedLeftTextAlign={false} />
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
				<FlexColumn>
					<MultiQuotePiece text={a} voice={aVoice} isSecondVoice={false} />
					<GapSpacing />
					<MultiQuotePiece text={b} voice={bVoice} isSecondVoice={true} />
				</FlexColumn>
				<QuoteAttribution quote={quote} />
			</MultiQuoteWidthControlContainer>
		</FlexRow>
	);
};

const MultiQuoteWidthControlContainer = tStyled(FlexColumn)`
	max-width: min(${LayoutBreakpointRem.f60}rem, 100%);
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
	const leftRender = isSecondVoice ? <Block.Fan32 /> : (
		<>
			<Divider />
			<Block.Dog16 />
		</>
	);
	const rightRender = isSecondVoice ? (
		<>
			<Block.Dog16 />
			<Divider />
		</>
	) : <Block.Fan32 />;

	return (
		<FlexRow justifyContent={justify} flex='none'>
			{leftRender}
			<div>
				{voiceRender}
				<QuotePiece isLarge={false} text={text} isForcedLeftTextAlign={true} />
			</div>
			{rightRender}
		</FlexRow>
	);
};

const VoiceText = tStyled.div`
	${fontDeclarations.regular};
	color: ${p => p.theme.textSubtle};
	line-height: normal;
	margin-bottom: ${Spacing.bat08};
`;

const Divider = tStyled.div`
	width: 1px;
	background-color: ${p => p.theme.outlineDistinct};
	flex-shrink: 0;
`;