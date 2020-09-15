import * as React from 'react';
import { iconTypes, Icon } from '@/core/symbol/icon';
import { titleHeight, RegularText, subtitleHeight } from '@/core/symbol/text';
import { Spacing, spacing, LineMaxWidthCenter } from '@/core/layout/common';
import { TextAlign, ListItemOppositeBackground, borderRadiusStyle, mediaBoxShadowStyle } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';

export interface QuotePieceProps {
	isLarge: boolean;
	text: string;
}

export const QuotePiece: React.FC<QuotePieceProps> = (props) => {
	const { isLarge, text } = props;
	if (!text) {
		return null;
	}

	const iconHeight = isLarge ? titleHeight : subtitleHeight;

	return (
		<QuoteBackground>
			<TopLeftAbsoluteIcon type={iconTypes.quotationOpen} height={iconHeight} fillColor={c => c.primaryA} />
			<Spacing margin={spacing.medium.horizontal}>
				<LineMaxWidthCenter>
					<TextAlign align='center'>
						<Spacing margin={spacing.medium.horizontal}>
							<MultilineQuoteText text={text} />
						</Spacing>
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