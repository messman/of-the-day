import * as React from 'react';
import { RegularText } from '@/core/symbol/text';
import { FlexRow, useWindowMediaLayout } from '@messman/react-common';
import { Spacing, Block } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';
import { FontWeight } from '@/core/style/theme';
import { HeaderIconAnimation, HeaderSubtitleAnimation, useHeaderAnimationState } from './header-animation';

/**
 * Returns different values for [title height, subtitle height, margin]
 * based on the width of the page, so that the header fits in correctly.
 */
export function useHeaderDimensions(): [string, string, string] {
	const { widthBreakpoint } = useWindowMediaLayout();
	if (widthBreakpoint >= LayoutBreakpointRem.f60) {
		return ['5rem', '4rem', Spacing.elf24];
	}
	else if (widthBreakpoint >= LayoutBreakpointRem.d40) {
		return ['4rem', '3rem', Spacing.dog16];
	}
	return ['2.3rem', '1.8rem', Spacing.dog16];
}

export const Header: React.FC = () => {

	const [titleHeight, subtitleHeight, rightMargin] = useHeaderDimensions();
	const animationState = useHeaderAnimationState();

	return (
		<Parent justifyContent='center' alignItems='center'>
			<HeaderImage />
			<TextCenter>
				<FlexRow>
					<HeaderIconAnimation animationState={animationState} titleHeight={titleHeight} subtitleHeight={subtitleHeight} rightMargin={rightMargin} />
					<div>
						<HeaderSubtitleAnimation animationState={animationState} height={subtitleHeight} />
						<HeaderBoldText dataFontSize={titleHeight}>Of The Day</HeaderBoldText>
					</div>
				</FlexRow>
				<Block.Elf24 />
				<TextSubtitleOnAccent>
					<RegularText>A place for Andrew to share things.</RegularText>
				</TextSubtitleOnAccent>
			</TextCenter>
			<HeaderShadow />
		</Parent>
	);
};

const TextCenter = tStyled.div`
	text-align: center;
`;

const TextSubtitleOnAccent = tStyled(RegularText)`
	text-align: center;
	color: ${p => p.theme.textDistinct};
`;

interface HeaderBoldTextProps {
	dataFontSize: string;
}

const HeaderBoldText = tStyled.div<HeaderBoldTextProps>`
	margin: 0;
	padding: 0;
	line-height: ${p => p.dataFontSize};
	font-size: ${p => p.dataFontSize};
	font-weight: ${FontWeight.bold};
	color: ${p => p.theme.textDistinct};
`;

const Parent = tStyled(FlexRow)`
	position: relative;
	overflow: hidden;
	flex: none;
	min-height: 70vh;
	background: ${p => p.theme.accent.eGradient};
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
	box-shadow: inset 0 0 8px 0 ${p => p.theme.shadowBase};
`;