import * as React from 'react';
import { fontDeclarations } from '@/core/symbol/text';
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
	if (widthBreakpoint >= LayoutBreakpointRem.d40) {
		return ['4rem', '3rem', Spacing.dog16];
	}
	return ['2.3rem', '1.8rem', Spacing.dog16];
}

export interface HeaderProps {
	isActive: boolean;
}

export const Header: React.FC<HeaderProps> = (props) => {

	const { isActive } = props;
	const [titleHeight, subtitleHeight, rightMargin] = useHeaderDimensions();
	const animationState = useHeaderAnimationState(isActive);

	return (
		<Parent justifyContent='center' alignItems='center'>
			<HeaderImage />
			<div>

				<FlexRow>
					<HeaderIconAnimation animationState={animationState} titleHeight={titleHeight} subtitleHeight={subtitleHeight} rightMargin={rightMargin} />
					<div>
						<HeaderSubtitleAnimation animationState={animationState} height={subtitleHeight} />
						<HeaderBoldText dataFontSize={titleHeight}>Of The Day</HeaderBoldText>
					</div>
				</FlexRow>
				<Block.Elf24 />
				<TextSubtitleOnAccent>
					A place for Andrew to share things.
				</TextSubtitleOnAccent>
			</div>
			{/* <HeaderShadow /> */}
		</Parent>
	);
};

const TextSubtitleOnAccent = tStyled.div`
	${fontDeclarations.regular};
	text-align: center;
	color: ${p => p.theme.textOnAccentFill};
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
	color: ${p => p.theme.textOnAccentFill};
`;

const Parent = tStyled(FlexRow)`
	position: relative;
	overflow: hidden;
	flex: none;
	min-height: 20vh;
	padding: ${Spacing.guy40} 0;
	background: ${p => p.theme.accent.gradient};
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

// const HeaderShadow = tStyled.div`
// 	flex: none;
// 	position: absolute;
// 	top: -5rem;
// 	left: -5rem;
// 	right: -5rem;
// 	bottom: 0;
// 	box-shadow: inset 0 0 8px 0 ${p => p.theme.shadowBase};
// `;