import * as React from 'react';
import { tCss, tStyled } from '@/core/style/styled';
import { useIsCompactWidth } from '@/services/layout/window-layout';
import { spacing } from '../layout/common';
import { regularTextHeight } from '../symbol/text';

/** Border-radius style. .375rem / 6px. */
export const borderRadiusValue: string = '.375rem';
export const borderRadiusStyle = tCss`
	border-radius: ${borderRadiusValue};
`;

export const mediaBoxShadowStyle = tCss`
	box-shadow: 0px 3px 15px 5px #111;
`;

export const Center = tStyled.div`
	text-align: center;
`;

export const FontSizeManager: React.FC = (props) => {
	const isCompact = useIsCompactWidth();

	React.useEffect(() => {
		document.body.style.fontSize = isCompact ? '16px' : '14px';
	}, [isCompact]);

	return <>{props.children}</>;
};

export const SeeMoreButton = tStyled.button`
	font-size: ${regularTextHeight};
	padding: ${spacing.medium.value} ${spacing.large.value};
	${borderRadiusStyle};
	border: none;
	color: ${p => p.theme.color.buttonActionText};
	background-color: ${p => p.theme.color.buttonActionBackground};
`;