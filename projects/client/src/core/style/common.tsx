import * as React from 'react';
import { tCss, tStyled } from '@/core/style/styled';
import { spacing } from '../layout/common';
import { FontSize } from '../symbol/text';

export const borderRadiusValue: string = '.3rem';
export const borderRadiusStyle = tCss`
	border-radius: ${borderRadiusValue};
`;

export const separatorThickness = '2px';

export const formTransitionStyle = tCss`
	transition: all .15s linear;
`;

export interface TextAlignProps {
	dataAlign: 'left' | 'right' | 'center';
}

export const TextAlign = tStyled.div<TextAlignProps>`
	text-align: ${p => p.dataAlign || 'left'};
`;

export const SeeMoreButton = tStyled.button`
	display: block;
	width: 100%;
	font-size: ${FontSize.textRegular};
	padding: ${spacing.medium.value} ${spacing.large.value};
	${borderRadiusStyle};
	border: none;
	color: ${p => p.theme.color.textDistinctOnAccent};
	background: ${p => p.theme.color.accentGradient};
`;

export interface HighlightBarProps {
	position: 'left' | 'top' | 'bottom';
	index: number;
	count: number;
}

export const HighlightBar: React.FC<HighlightBarProps> = (props) => {
	const { position, index, count } = props;

	const percentLength = Math.round((1 / count) * 100);
	const percentOffset = Math.round(percentLength * index);

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
	${formTransitionStyle};
	background-color: ${p => p.theme.color.accentFillOnBackground};
	border-radius: ${highlightThickness / 2}px;
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