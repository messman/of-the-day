import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { useWindowLayout } from '@messman/react-common';
import * as React from 'react';
import { ApplicationMaxWidth, Spacing, spacing } from '../layout/common';
import { tStyled } from '../style/styled';

import { Heading1 } from '../symbol/text';
import { CardFlow } from './card-flow';

export interface CardGroupProps {
	title?: string | null;
	isAlternateBackground?: boolean;
	isAutoAlternateBackground?: boolean;
}


export const CardGroup: React.FC<CardGroupProps> = (props) => {

	const { title, isAlternateBackground, isAutoAlternateBackground, children } = props;
	const { widthBreakpoint } = useWindowLayout();
	const groupSpacing = widthBreakpoint <= LayoutBreakpoint.mobileLarge ? spacing.large : spacing.grand;

	const titleMargin = `0 auto ${groupSpacing.value} auto`;

	const titleRender = title ? (
		<Heading1
			textAlign='center'
			margin={titleMargin}
		>
			{title}
		</Heading1>
	) : null;

	const Background = isAutoAlternateBackground ? AutoAlternatingBackground : (isAlternateBackground ? AlternateBackground : UnchangedBackground);

	return (
		<Background>
			<ApplicationMaxWidth>
				<Spacing padding={groupSpacing.vertical}>
					{titleRender}
					<CardFlow>
						{children}
					</CardFlow>
				</Spacing>
			</ApplicationMaxWidth>
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