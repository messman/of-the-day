import * as React from 'react';
import { RegularText } from '@/core/symbol/text';
import { FlexRow, useWindowMediaLayout } from '@messman/react-common';
import { spacing, Spacing, TopMargin } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { FontWeight } from '@/core/style/theme';
import { HeaderIconAnimation, HeaderSubtitleAnimation, useHeaderAnimationState } from './header-animation';

/**
 * Returns different values for [title height, subtitle height, margin]
 * based on the width of the page, so that the header fits in correctly.
 */
export function useHeaderDimensions(): [string, string, string] {
	const { widthBreakpoint } = useWindowMediaLayout();
	if (widthBreakpoint >= LayoutBreakpoint.desktop) {
		return ['5rem', '4rem', spacing.large.value];
	}
	else if (widthBreakpoint >= LayoutBreakpoint.mobileLarge) {
		return ['4rem', '3rem', spacing.medium.value];
	}
	return ['2.3rem', '1.8rem', spacing.medium.value];
}

export const Header: React.FC = () => {

	const [titleHeight, subtitleHeight, rightMargin] = useHeaderDimensions();
	const topBottomMargin = `${titleHeight} 0`;
	const textTopMargin = `${subtitleHeight} 0 0 0`;

	const animationState = useHeaderAnimationState();

	return (
		<Parent justifyContent='center' alignItems='center'>
			<HeaderImage />
			<Spacing textAlign='center' margin={topBottomMargin}>
				<FlexRow>
					<HeaderIconAnimation animationState={animationState} titleHeight={titleHeight} subtitleHeight={subtitleHeight} rightMargin={rightMargin} />
					<div>
						<HeaderSubtitleAnimation animationState={animationState} height={subtitleHeight} />
						<HeaderBoldText dataFontSize={titleHeight}>Of The Day</HeaderBoldText>
					</div>
				</FlexRow>
				<Spacing margin={textTopMargin}>
					<TextSubtitleOnAccent>
						<RegularText>A place for Andrew to share things</RegularText>
						<TopMargin.Nudge>
							<RegularText>until he runs out of money.</RegularText>
						</TopMargin.Nudge>
					</TextSubtitleOnAccent>
				</Spacing>
			</Spacing>
			<HeaderShadow />
		</Parent>
	);
};

const TextSubtitleOnAccent = tStyled.div`
	text-align: center;
	color: ${p => p.theme.color.textDistinctOnAccent};
`;

interface HeaderBoldTextProps {
	dataFontSize: string;
}

const HeaderBoldText = tStyled.div<HeaderBoldTextProps>`
	margin: 0;
	padding: 0;
	line-height: ${p => p.dataFontSize};
	font-size: ${p => p.dataFontSize};
	font-weight: ${FontWeight.extraBold};
	color: ${p => p.theme.color.textDistinctOnAccent};
`;

const Parent = tStyled(FlexRow)`
	position: relative;
	overflow: hidden;
	flex: none;
	min-height: 70vh;
	background: ${p => p.theme.color.accentGradient};
`;

const headerImageDataUrl = require('@/static/images/header-background.png').default as string;

const HeaderImage = tStyled.div`
	flex: none;
	position: absolute;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	background-image: url(${headerImageDataUrl});
	background-position: center;
	opacity: .075;
`;

const HeaderShadow = tStyled.div`
	flex: none;
	position: absolute;
	top: -5rem;
	left: -5rem;
	right: -5rem;
	bottom: 0;
	box-shadow: inset 0 0 8px 0 ${p => p.theme.color.accentGradientFillShadow};
`;