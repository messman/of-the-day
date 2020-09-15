// Handles the rendering of a quote.

import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { RegularText, subTextHeight, Subtitle } from '@/core/symbol/text';
import { IPostQuote } from 'oftheday-shared';
import { borderRadiusStyle, ListItemOppositeBackground, mediaBoxShadowStyle, TextAlign } from '@/core/style/common';
import { Icon, iconTypes } from '@/core/symbol/icon';
import { titleHeight } from '@/core/symbol/text';
import { spacing, Spacing, LineMaxWidth } from '@/core/layout/common';
import { Flex, FlexRow } from '@messman/react-common';
import { OutLink } from '@/core/link';
import { ElementRoot } from '../post';
import { LayoutBreakpoint } from '@/services/layout/window-layout';

export interface MusicQuoteProps {
	lyric: string;
}

export const MusicQuote: React.FC<MusicQuoteProps> = (props) => {
	// Required
	if (!props.lyric) {
		return null;
	}

	const quote: IPostQuote = {
		a: props.lyric,
		aVoice: '',
		b: '',
		bVoice: '',
		source: '',
		sourceLink: ''
	};

	return (
		<MaxWidthContainer>
			<InnerQuote quote={quote} />
		</MaxWidthContainer>
	);
};

export interface QuoteProps {
	quote: IPostQuote;
}

export const Quote: React.FC<QuoteProps> = (props) => {
	const { quote } = props;
	const { a } = quote;
	if (!a) {
		return null;
	}

	return (
		<ElementRoot>
			<TextAlign align='center'>
				<Subtitle margin={spacing.medium.bottom}>Quote</Subtitle>
			</TextAlign>
			<InnerQuote quote={quote} />
		</ElementRoot>
	);
};

const InnerQuote: React.FC<QuoteProps> = (props) => {
	const { quote } = props;
	const { a, aVoice, b, bVoice, source, sourceLink } = quote;
	if (!a) {
		return null;
	}

	let render: JSX.Element = null!;
	let singleVoice: string | null = null;

	if (!b) {
		singleVoice = aVoice || null;
		render = (
			<>
				<TopLeftAbsoluteIcon type={iconTypes.quotationOpen} height={titleHeight} fillColor={c => c.primaryA} />
				<Spacing margin={spacing.medium.horizontal}>
					<TextAlign align='center'>
						<MultilineQuoteText text={a}></MultilineQuoteText>
					</TextAlign>
				</Spacing>
				<BottomRightAbsoluteIcon type={iconTypes.quotationClose} height={titleHeight} fillColor={c => c.primaryA} />
			</>
		);
	}
	else {
		const gapSpacing = bVoice ? spacing.large : spacing.medium;

		render = (
			<>
				<HalfQuote text={a} voice={aVoice} />
				<Spacing margin={gapSpacing.top} />
				<HalfQuote text={b} voice={bVoice} />
			</>
		);
	}

	let sourceRender: JSX.Element | string | null = null;
	if (source) {
		if (sourceLink) {
			sourceRender = <OutLink href={sourceLink}>{source}</OutLink>;
		}
		else {
			sourceRender = source;
		}
	}

	let attributionRender: JSX.Element | string | null = null;
	if (singleVoice && sourceRender) {
		attributionRender = <>{singleVoice}, {sourceRender}</>;
	}
	else if (singleVoice) {
		attributionRender = singleVoice;
	}
	else if (sourceRender) {
		attributionRender = sourceRender;
	}

	if (attributionRender) {
		attributionRender = (
			<Right margin={spacing.small.top}>
				<RegularText>&mdash;&#8288;&nbsp;&#8288;{attributionRender}</RegularText>
			</Right>
		);
	}

	return (
		<MaxWidthContainer>
			<QuoteBackground>
				{render}
			</QuoteBackground>
			{attributionRender}
		</MaxWidthContainer>
	);
};

const MaxWidthContainer = tStyled.div`
	max-width: ${LayoutBreakpoint.tablet}px;
	margin: auto;
`;

const QuoteBackground = tStyled(ListItemOppositeBackground)`
	display: inline-block;
	padding: ${spacing.medium.value};
	position: relative;
	${borderRadiusStyle}
	${mediaBoxShadowStyle}
`;


const TopLeftAbsoluteIcon = tStyled(Icon)`
	position: absolute;
	top: calc(-${p => p.height} / 3);
	left: calc(-${p => p.height} / 4);
`;

const BottomRightAbsoluteIcon = tStyled(Icon)`
	position: absolute;
	bottom: calc(-${p => p.height} / 3);
	right: calc(-${p => p.height} / 4);
`;


const Right = tStyled(Spacing)`
	text-align: right;
	word-wrap: break-word;
`;

interface HalfQuoteProps {
	text: string;
	voice: string;
}

const HalfQuote: React.FC<HalfQuoteProps> = (props) => {
	const { text, voice } = props;

	const textRender = (
		<FlexRow alignItems='stretch'>
			<Icon type={iconTypes.quotationOpen} height={subTextHeight} fillColor={c => c.primaryA} />
			&nbsp;
			<Flex>
				<LineMaxWidth>
					<RegularText isInline={true}>
						{text}
						&#8288;&nbsp;&#8288;
						<Icon type={iconTypes.quotationClose} height={subTextHeight} fillColor={c => c.primaryA} />
					</RegularText>
				</LineMaxWidth>
			</Flex>
		</FlexRow>
	);

	let render: JSX.Element = textRender;
	if (voice) {
		const voiceLabel = voice + ':';
		render = (
			<>
				<RegularText color={c => c.textTitle} margin={spacing.small.bottom}>{voiceLabel}</RegularText>
				{textRender}
			</>
		);
	}

	return render;
};

const multilineQuoteTextSeparator = '/';

interface MultilineQuoteTextProps {
	text: string;
}

const MultilineQuoteText: React.FC<MultilineQuoteTextProps> = (props) => {
	const lines = props.text.split(multilineQuoteTextSeparator).map((line, i) => {
		return <RegularText key={i}>{line.trim()}</RegularText>;
	});
	return <>{lines}</>;
};