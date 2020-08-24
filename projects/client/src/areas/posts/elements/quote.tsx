// Handles the rendering of a quote.

import * as React from 'react';
import { styled } from '@/core/style/styled';
import { Text, subTextHeight } from '@/core/symbol/text';
import { IPostQuote } from 'oftheday-shared';
import { borderRadiusStyle, largerSpacing, smallerSpacing } from '@/core/style/common';
import { Icon, iconTypes } from '@/core/symbol/icon';
import { titleHeight } from '@/core/symbol/text';
import { DynamicMargin, LabelValue } from '@/core/layout/common';
import { DefaultLayoutBreakpoint, Flex, FlexRow } from '@messman/react-common';
import { OutLink } from '@/core/link';
import { ElementSeparator } from './separators';

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
		<DynamicMargin margin={largerSpacing.horizontal}>
			<DynamicMargin margin={largerSpacing.vertical}>
				<Text isBold={true}>Quote</Text>
			</DynamicMargin>
			<DynamicMargin margin={largerSpacing.vertical}>
				<InnerQuote quote={quote} />
			</DynamicMargin>
			<ElementSeparator />
		</DynamicMargin>
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
				<TopLeftAbsoluteIcon type={iconTypes.quotationOpen} height={titleHeight} />
				<CenterAndEmphasize margin={largerSpacing.horizontal}>
					<MultilineQuoteText text={a}></MultilineQuoteText>
				</CenterAndEmphasize>
				<BottomRightAbsoluteIcon type={iconTypes.quotationClose} height={titleHeight} />
			</>
		);
	}
	else {
		render = (
			<>
				<HalfQuote text={a} voice={aVoice} />
				<DynamicMargin margin={largerSpacing.top} />
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
			<Right margin={smallerSpacing.top}>
				<Text>&mdash;&#8288;&nbsp;&#8288;{attributionRender}</Text>
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

const MaxWidthContainer = styled.div`
	max-width: ${DefaultLayoutBreakpoint.regular}px;
	margin: auto;
`;

const QuoteBackground = styled.div`
	padding: ${largerSpacing.value};
	position: relative;
	background-color: ${p => p.theme.color.backgroundB};
	${borderRadiusStyle}
`;


const TopLeftAbsoluteIcon = styled(Icon)`
	position: absolute;
	top: calc(-${p => p.height} / 3);
	left: calc(-${p => p.height} / 4);
`;

const BottomRightAbsoluteIcon = styled(Icon)`
	position: absolute;
	bottom: calc(-${p => p.height} / 3);
	right: calc(-${p => p.height} / 4);
`;

const CenterAndEmphasize = styled(DynamicMargin)`
	text-align: center;
	font-style: italic;
`;

const Right = styled(DynamicMargin)`
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
			<Icon type={iconTypes.quotationOpen} height={subTextHeight} />
				&nbsp;
			<Flex>
				<Text isInline={true}>{text}</Text>
					&nbsp;
					<Icon type={iconTypes.quotationClose} height={subTextHeight} />
			</Flex>
		</FlexRow>
	);

	let render: JSX.Element = textRender;
	if (voice) {
		const voiceLabel = voice + ':';
		render = (
			<LabelValue label={voiceLabel}>
				{textRender}
			</LabelValue>
		);
	}

	return render;
};

const multilineQuoteTextSeparator = '/';

interface MultilineQuoteTextProps {
	text: string;
}

const MultilineQuoteText: React.FC<MultilineQuoteTextProps> = (props) => {
	const lines = props.text.split(multilineQuoteTextSeparator).map((line) => {
		return <Text>{line.trim()}</Text>;
	});
	return <>{lines}</>;
};