// Handles the rendering of a quote.

import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { RegularText, subTextHeight, Subtitle } from '@/core/symbol/text';
import { IPostQuote } from 'oftheday-shared';
import { borderRadiusStyle } from '@/core/style/common';
import { Icon, iconTypes } from '@/core/symbol/icon';
import { titleHeight } from '@/core/symbol/text';
import { spacing, Spacing } from '@/core/layout/common';
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
			<Spacing margin={spacing.medium.horizontal}>
				<Spacing margin={spacing.medium.vertical}>
					<RegularText isBold={true}>Quote</RegularText>
				</Spacing>
				<Spacing margin={spacing.medium.vertical}>
					<InnerQuote quote={quote} />
				</Spacing>
			</Spacing>
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
				<CenterAndEmphasize margin={spacing.medium.horizontal}>
					<MultilineQuoteText text={a}></MultilineQuoteText>
				</CenterAndEmphasize>
				<BottomRightAbsoluteIcon type={iconTypes.quotationClose} height={titleHeight} fillColor={c => c.primaryA} />
			</>
		);
	}
	else {
		render = (
			<>
				<HalfQuote text={a} voice={aVoice} />
				<Spacing margin={spacing.medium.top} />
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

const QuoteBackground = tStyled.div`
	padding: ${spacing.medium.value};
	position: relative;
	background-color: ${p => p.theme.color.backgroundB};
	${borderRadiusStyle}
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

const CenterAndEmphasize = tStyled(Spacing)`
	text-align: center;
	font-style: italic;
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
				<RegularText isInline={true}>{text}</RegularText>
					&nbsp;
					<Icon type={iconTypes.quotationClose} height={subTextHeight} fillColor={c => c.primaryA} />
			</Flex>
		</FlexRow>
	);

	let render: JSX.Element = textRender;
	if (voice) {
		const voiceLabel = voice + ':';
		render = (
			<>
				<Subtitle>{voiceLabel}</Subtitle>
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