import * as React from 'react';
import { RegularText } from '@/core/symbol/text';
import { FlexRow, useWindowLayout } from '@messman/react-common';
import { spacing, Spacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { FontWeight } from '@/core/style/theme';
import { HeaderIconAnimation, HeaderSubtitleAnimation, useHeaderAnimationState } from './header-animation';

export function useHeaderDimensions(): [string, string] {
	const { widthBreakpoint } = useWindowLayout();
	if (widthBreakpoint >= LayoutBreakpoint.desktop) {
		return ['5rem', '4rem'];
	}
	else if (widthBreakpoint >= LayoutBreakpoint.mobileLarge) {
		return ['4rem', '3rem'];
	}
	return ['2.3rem', '1.8rem'];
}

export const Header: React.FC = () => {

	const [titleHeight, subtitleHeight] = useHeaderDimensions();
	const topBottomMargin = `${titleHeight} 0`;
	const textTopMargin = `${subtitleHeight} 0 0 0`;

	const animationState = useHeaderAnimationState();

	return (
		<Parent justifyContent='center' alignItems='center'>
			<HeaderImage />
			<Spacing textAlign='center' margin={topBottomMargin}>
				<FlexRow>
					<HeaderIconAnimation animationState={animationState} titleHeight={titleHeight} subtitleHeight={subtitleHeight} />
					<div>
						<HeaderSubtitleAnimation animationState={animationState} height={subtitleHeight} />
						<HeaderBoldText dataFontSize={titleHeight}>Of The Day</HeaderBoldText>
					</div>
				</FlexRow>
				<Spacing textAlign='center' margin={textTopMargin}>
					<RegularText color={c => c.textDistinctOnAccent}>A place for Andrew to share things</RegularText>
					<RegularText color={c => c.textDistinctOnAccent} margin={spacing.nudge.top}>until he runs out of money.</RegularText>
				</Spacing>
			</Spacing>
			<HeaderShadow />
		</Parent>
	);
};

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
	opacity: .13;
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