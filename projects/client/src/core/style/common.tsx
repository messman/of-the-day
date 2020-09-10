import * as React from 'react';
import { tCss, tStyled } from '@/core/style/styled';
import { useIsCompactWidth } from '@/services/layout/window-layout';

/** Border-radius style. .375rem / 6px. */
export const borderRadiusValue: string = '.375rem';
export const borderRadiusStyle = tCss`
	border-radius: ${borderRadiusValue};
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