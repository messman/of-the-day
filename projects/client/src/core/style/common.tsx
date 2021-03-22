import * as React from 'react';
import { tCss, tStyled } from '@/core/style/styled';
import { FlexColumn } from '@messman/react-common';

export const borderRadiusValue: string = '.25rem';
export const borderRadiusStyle = tCss`
	border-radius: ${borderRadiusValue};
`;

export const separatorThickness = '2px';

export const formTransitionStyle = tCss`
	transition: all .15s linear;
`;

export interface HighlightBarProps {
	position: 'left' | 'top' | 'bottom';
	index: number;
	count: number;
}

export const HighlightBar: React.FC<HighlightBarProps> = (props) => {
	const { position, index, count } = props;

	const percentLength = Math.round((1 / count) * 1000) / 10;
	const percentOffset = percentLength * index;

	const isVertical = position === 'left';
	if (isVertical) {
		return <HighlightBarVertical $isTop={false} $percentLength={percentLength} $percentOffset={percentOffset} />;
	}
	else {
		const isTop = position === 'top';
		return <HighlightBarHorizontal $isTop={isTop} $percentLength={percentLength} $percentOffset={percentOffset} />;
	}
};

interface HighlightBarInnerProps {
	$isTop: boolean;
	$percentLength: number;
	$percentOffset: number;
}

const highlightThickness = 4;
const highlightBarCommonStyle = tCss`
	position: absolute;
	background-color: ${p => p.theme.accent.aMain};
	border-radius: ${highlightThickness / 2}px;
	${formTransitionStyle}
`;

const HighlightBarHorizontal = tStyled.div<HighlightBarInnerProps>`
	${highlightBarCommonStyle};
	${p => p.$isTop ? 'top' : 'bottom'}: 0;
	width: ${p => p.$percentLength}%;
	height: ${highlightThickness}px;
	left: ${p => p.$percentOffset}%;
	transition-property: left;
`;

const HighlightBarVertical = tStyled.div<HighlightBarInnerProps>`
	${highlightBarCommonStyle};
	left: 0;
	height: ${p => p.$percentLength}%;
	width: ${highlightThickness}px;
	top: ${p => p.$percentOffset}%;
	transition-property: top;
`;

export interface EmptySpaceHackProps {
	height: number;
	showBackground?: boolean;
}

/**
 * Prevents us being able to see between the cracks of the two stickies.
 * Also functions as the marker for our scrolling.
 */
export const EmptySpaceHack = React.forwardRef<HTMLDivElement, EmptySpaceHackProps>((props, ref) => {
	return (
		<EmptySpaceContainer justifyContent='flex-end'>
			<EmptySpace ref={ref} $height={props.height} $showBackground={!!props.showBackground} />
		</EmptySpaceContainer>
	);
});

const EmptySpaceContainer = tStyled(FlexColumn)`
	height: 0;
	width: 100%;
`;

interface EmptySpaceProps {
	$height: number;
	$showBackground: boolean;
}

const EmptySpace = tStyled.div<EmptySpaceProps>`
	flex: none;
	height: ${p => p.$height}px;
	pointer-events: none;
	background-color: ${p => p.$showBackground ? p.theme.bg : 'transparent'};
`;