import * as React from 'react';
import { tCss, tStyled } from '@/core/style/styled';
import { spacing } from '../layout/common';
import { regularTextHeight } from '../symbol/text';
import { useWindowLayout } from '@messman/react-common';
import { LayoutBreakpoint } from '@/services/layout/window-layout';

/** Border-radius style. .375rem / 6px. */
export const borderRadiusValue: string = '.375rem';
export const borderRadiusStyle = tCss`
	border-radius: ${borderRadiusValue};
`;

export const mediaBoxShadowStyle = tCss`
	box-shadow: 0px 3px 15px 5px ${p => p.theme.color.shadow};
`;

export interface TextAlignProps {
	dataAlign: 'left' | 'right' | 'center';
}

export const TextAlign = tStyled.div<TextAlignProps>`
	text-align: ${p => p.dataAlign || 'left'};
`;

export const FontSizeManager: React.FC = (props) => {
	const windowLayout = useWindowLayout();
	const { widthBreakpoint } = windowLayout;

	React.useEffect(() => {

		// Default font size.
		let fontSize = '16px';
		if (widthBreakpoint <= LayoutBreakpoint.mobileLarge) {
			fontSize = '14px';
		}
		else if (widthBreakpoint >= LayoutBreakpoint.wide) {
			fontSize = '18px';
		}

		document.documentElement.style.fontSize = fontSize;
	}, [widthBreakpoint]);

	return <>{props.children}</>;
};

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

export const ListItemOppositeBackground = tStyled.div`
	background-color: ${p => p.theme.color.backgroundB};
`;

export const ListItemBackground = tStyled.div`
	&:nth-child(even) {
		background-color: ${p => p.theme.color.backgroundB};

		${ListItemOppositeBackground} {
			background-color: ${p => p.theme.color.backgroundA};
		}
	}
`;
