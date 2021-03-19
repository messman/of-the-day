import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { useWindowMediaLayout } from '@messman/react-common';
import * as React from 'react';
import { Spacing, spacing } from '../layout/common';
import { tStyled } from '../style/styled';

import { Heading1 } from '../symbol/text';

export interface CardGroupProps {
	title?: string | null;
	isAlternateBackground?: boolean;
	isAutoAlternateBackground?: boolean;
}


export const CardGroup: React.FC<CardGroupProps> = (props) => {

	const { title, isAlternateBackground, isAutoAlternateBackground, children } = props;
	const { widthBreakpoint } = useWindowMediaLayout();
	const groupSpacing = widthBreakpoint <= LayoutBreakpoint.mobileLarge ? spacing.large : spacing.grand;

	const titleMargin = `0 auto ${groupSpacing.value} auto`;

	const titleRender = title ? (
		<Spacing textAlign='center' margin={titleMargin}>
			<Heading1>
				{title}
			</Heading1>
		</Spacing>
	) : null;

	const Background = isAutoAlternateBackground ? AutoAlternatingBackground : (isAlternateBackground ? AlternateBackground : UnchangedBackground);

	return (
		<Background>
			<Spacing padding={groupSpacing.vertical}>
				{titleRender}
				{children}
			</Spacing>
		</Background>
	);
};

const AutoAlternatingBackground = tStyled.div`
	&:nth-child(even) {
		background-color: ${p => p.theme.color.bg2};
	}
`;

const AlternateBackground = tStyled.div`
	background-color: ${p => p.theme.color.bg2};
`;

const UnchangedBackground = tStyled.div``;