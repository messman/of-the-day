import * as React from 'react';
import { iconTypes, SizedIcon } from '@/core/symbol/icon';
import { fontDeclarations, FontSize, lineHeights } from '@/core/symbol/text';
import { Spacing } from '@/core/layout/common';
import { borderRadiusStyle } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { lineBreakpoint } from '@/services/layout/window-layout';

export interface QuotePieceProps {
	isLarge: boolean;
	isForcedLeftTextAlign: boolean;
	text: string;
}

export const QuotePiece: React.FC<QuotePieceProps> = (props) => {
	const { isLarge, text, isForcedLeftTextAlign } = props;
	if (!text) {
		return null;
	}

	const iconHeight = isLarge ? FontSize.heading1 : FontSize.heading2;

	const lines = props.text.split(multilineQuoteTextSeparator)
		.map((line) => {
			return line.trim();
		})
		.filter(x => !!x);
	if (!lines.length) {
		return null;
	}

	let isLeftAlign = isForcedLeftTextAlign;
	if (!isLeftAlign) {
		// We still want to force into left align under certain conditions, like if there is a lot of text.
		if (lines.length === 1) {
			const onlyLine = lines[0];
			isLeftAlign = onlyLine.length > 150;
		}
	}

	const Align = isLeftAlign ? LeftTextAlign : CenterTextAlign;

	return (
		<QuoteBackground>
			<TopLeftAbsoluteIcon type={iconTypes.quotationOpen} size={iconHeight} />
			<LineMaxWidthCenter>
				<Align>
					<MultilineQuoteText lines={lines} />
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
	background-color: ${p => p.theme.subtleFill.a0Background};
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
	color: ${p => p.theme.accent.subtle};
`;

const BottomRightAbsoluteIcon = tStyled(SizedIcon)`
	position: absolute;
	bottom: calc(-${p => p.size} / 3);
	right: calc(-${p => p.size} / 4);
	color: ${p => p.theme.accent.subtle};
`;

const multilineQuoteTextSeparator = '/';

interface MultilineQuoteTextProps {
	lines: string[];
}

const MultilineQuoteText: React.FC<MultilineQuoteTextProps> = (props) => {
	const linesRender = props.lines.map((line) => {
		return <QuoteText key={line}>{line}</QuoteText>;
	});
	return <>{linesRender}</>;
};

const QuoteText = tStyled.div`
	${fontDeclarations.regular};
	${lineHeights.body};
	color: ${p => p.theme.textDistinct};
`;