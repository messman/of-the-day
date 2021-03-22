import * as React from 'react';
import { iconTypes, SizedIcon } from '@/core/symbol/icon';
import { FontSize, RegularText } from '@/core/symbol/text';
import { Spacing } from '@/core/layout/common';
import { borderRadiusStyle } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { lineBreakpoint } from '@/services/layout/window-layout';

export interface QuotePieceProps {
	isLarge: boolean;
	isLeftTextAlign: boolean;
	text: string;
}

export const QuotePiece: React.FC<QuotePieceProps> = (props) => {
	const { isLarge, text, isLeftTextAlign } = props;
	if (!text) {
		return null;
	}

	const iconHeight = isLarge ? FontSize.heading1 : FontSize.heading2;
	const Align = isLeftTextAlign ? LeftTextAlign : CenterTextAlign;

	return (
		<QuoteBackground>
			<TopLeftAbsoluteIcon type={iconTypes.quotationOpen} size={iconHeight} />
			<LineMaxWidthCenter>
				<Align>
					<MultilineQuoteText text={text} />
				</Align>
			</LineMaxWidthCenter>
			<BottomRightAbsoluteIcon type={iconTypes.quotationClose} size={iconHeight} />
		</QuoteBackground>
	);
};

const CenterTextAlign = tStyled.div`
	text-align: center;
`;

const LeftTextAlign = tStyled.div`
	text-align: left;
`;

export interface QuoteBackgroundProps {
}

const QuoteBackground = tStyled.div<QuoteBackgroundProps>`
	background-color: ${p => p.theme.subtleFill.b1Card};
	border: 1px solid ${p => p.theme.outlineDistinct};
	padding: ${Spacing.dog16};
	position: relative;
	${borderRadiusStyle}
`;

const LineMaxWidthCenter = tStyled.div`
	max-width: ${lineBreakpoint};
	margin: 0 ${Spacing.dog16};
`;

const TopLeftAbsoluteIcon = tStyled(SizedIcon)`
	position: absolute;
	top: calc(-${p => p.size} / 3);
	left: calc(-${p => p.size} / 4);
	color: ${p => p.theme.accent.aMain};
`;

const BottomRightAbsoluteIcon = tStyled(SizedIcon)`
	position: absolute;
	bottom: calc(-${p => p.size} / 3);
	right: calc(-${p => p.size} / 4);
	color: ${p => p.theme.accent.aMain};
`;

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