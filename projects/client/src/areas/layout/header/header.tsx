import * as React from 'react';
import { RegularText } from '@/core/symbol/text';
import { FlexRow, useWindowLayout } from '@messman/react-common';
import { spacing, Spacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { FontWeight } from '@/core/style/theme';
import { HeaderIconAnimation, HeaderSubtitleAnimation, useHeaderAnimationState } from './header-animation';
import { borderRadiusValue } from '@/core/style/common';

export function useHeaderDimensions(): [string, string, string] {
	const { widthBreakpoint } = useWindowLayout();
	if (widthBreakpoint >= LayoutBreakpoint.desktop) {
		return ['5rem', '4rem', '.9rem'];
	}
	else if (widthBreakpoint >= LayoutBreakpoint.mobileLarge) {
		return ['4rem', '3rem', '.6rem'];
	}
	return ['2.3rem', '1.8rem', borderRadiusValue];
}

export const Header: React.FC = () => {

	const [titleHeight, subtitleHeight, borderRadiusValue] = useHeaderDimensions();
	const topBottomMargin = `${titleHeight} 0`;
	const textTopMargin = `${subtitleHeight} 0 0 0`;

	const animationState = useHeaderAnimationState();

	return (
		<Parent justifyContent='center' alignItems='center'>
			<HeaderImage />
			<Spacing textAlign='center' margin={topBottomMargin}>
				<FlexRow>
					<HeaderIconAnimation animationState={animationState} titleHeight={titleHeight} subtitleHeight={subtitleHeight} borderRadiusValue={borderRadiusValue} />
					<div>
						<HeaderSubtitleAnimation animationState={animationState} height={subtitleHeight} />
						<HeaderBoldText dataFontSize={titleHeight}>Of The Day</HeaderBoldText>
					</div>
				</FlexRow>
				<Spacing textAlign='center' margin={textTopMargin}>
					<RegularText color={c => c.headerText}>A place for Andrew to share things</RegularText>
					<RegularText color={c => c.headerText} margin={spacing.nudge.top}>until he runs out of money.</RegularText>
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
	color: ${p => p.theme.color.headerText};
`;

const Parent = tStyled(FlexRow)`
	position: relative;
	background-color: ${p => p.theme.color.headerBackground};
	overflow: hidden;
	flex: none;
	min-height: 70vh;
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

// export const HeaderImageOverlay = tStyled.div`
// 	position: absolute;
// 	margin: 0;
// 	padding: 0;
// 	width: 100%;
// 	height: 100%;
// 	background-image: radial-gradient(circle farthest-side at center, ${p => p.theme.color.headerBackground} 20%, transparent 100%);
// `;

const HeaderShadow = tStyled.div`
	flex: none;
	position: absolute;
	top: -5rem;
	left: -5rem;
	right: -5rem;
	bottom: 0;
	box-shadow: inset 0 0 1rem 0px ${p => p.theme.color.darkShadow};
`;