import * as React from 'react';
import { iconTypes, Icon } from '@/core/symbol/icon';
import { FontSize, RegularText } from '@/core/symbol/text';
import { Spacing, spacing } from '@/core/layout/common';
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
			<TopLeftAbsoluteIcon type={iconTypes.quotationOpen} height={iconHeight} fillColor={c => c.textAccentOnBackground} />
			<Spacing margin={spacing.medium.horizontal}>
				<LineMaxWidthCenter>
					<Align>
						<MultilineQuoteText text={text} />
					</Align>
				</LineMaxWidthCenter>
			</Spacing>
			<BottomRightAbsoluteIcon type={iconTypes.quotationClose} height={iconHeight} fillColor={c => c.textAccentOnBackground} />
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
	background-color: ${p => p.theme.color.bgComponent2};
	border: 1px solid ${p => p.theme.color.bgComponent3};
	padding: ${spacing.medium.value};
	position: relative;
	${borderRadiusStyle}
`;

const LineMaxWidthCenter = tStyled.div`
	max-width: ${lineBreakpoint};
	margin-left: auto;
	margin-right: auto;
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