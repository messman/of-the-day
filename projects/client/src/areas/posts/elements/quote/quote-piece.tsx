import * as React from 'react';
import { iconTypes, Icon } from '@/core/symbol/icon';
import { titleHeight, RegularText, subtitleHeight } from '@/core/symbol/text';
import { Spacing, spacing } from '@/core/layout/common';
import { TextAlign, ListItemOppositeBackground, borderRadiusStyle, mediaBoxShadowStyle } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { lineBreakpoint } from '@/services/layout/window-layout';

export interface QuotePieceProps {
	isLarge: boolean;
	align: 'center' | 'left' | 'right';
	text: string;
}

export const QuotePiece: React.FC<QuotePieceProps> = (props) => {
	const { isLarge, text, align } = props;
	if (!text) {
		return null;
	}

	const iconHeight = isLarge ? titleHeight : subtitleHeight;

	return (
		<QuoteBackground>
			<TopLeftAbsoluteIcon type={iconTypes.quotationOpen} height={iconHeight} fillColor={c => c.primaryA} />
			<Spacing margin={spacing.medium.horizontal}>
				<LineMaxWidthCenter>
					<TextAlign dataAlign={align}>
						<MultilineQuoteText text={text} />
					</TextAlign>
				</LineMaxWidthCenter>
			</Spacing>
			<BottomRightAbsoluteIcon type={iconTypes.quotationClose} height={iconHeight} fillColor={c => c.primaryA} />
		</QuoteBackground>
	);
};

export interface QuoteBackgroundProps {
}

const QuoteBackground = tStyled(ListItemOppositeBackground) <QuoteBackgroundProps>`
	padding: ${spacing.medium.value};
	position: relative;
	${borderRadiusStyle}
	${mediaBoxShadowStyle}
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