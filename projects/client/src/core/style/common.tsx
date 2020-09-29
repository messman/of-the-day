import { tCss, tStyled } from '@/core/style/styled';
import { spacing } from '../layout/common';
import { FontSize } from '../symbol/text';

/** Border-radius style. .375rem. */
export const borderRadiusValue: string = '.375rem';
export const borderRadiusStyle = tCss`
	border-radius: ${borderRadiusValue};
`;

export const separatorThickness = '3px';

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
	color: ${p => p.theme.color.textOverAccent};
	background: ${p => p.theme.color.accentGradient};
`;