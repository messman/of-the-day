import { tCss, tStyled } from '@/core/style/styled';
import { spacing } from '../layout/common';
import { regularTextHeight } from '../symbol/text';

/** Border-radius style. .375rem. */
export const borderRadiusValue: string = '.375rem';
export const borderRadiusStyle = tCss`
	border-radius: ${borderRadiusValue};
`;

export const mediaBoxShadowStyle = tCss`
	box-shadow: 0px 3px 15px 5px ${p => p.theme.color.darkShadow};
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
	font-size: ${regularTextHeight};
	padding: ${spacing.medium.value} ${spacing.large.value};
	${borderRadiusStyle};
	border: none;
	color: ${p => p.theme.color.buttonActionText};
	background-color: ${p => p.theme.color.buttonActionBackground};
`;