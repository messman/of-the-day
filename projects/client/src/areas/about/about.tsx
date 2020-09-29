import { Card } from '@/core/card/card';
import { Spacing, spacing, useResponsiveEdgeSpacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { iconTypes } from '@/core/symbol/icon';
import { Heading1 } from '@/core/symbol/text';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import * as React from 'react';

export interface AboutProps {

}

export const About: React.FC<AboutProps> = () => {

	const edgeSpacing = useResponsiveEdgeSpacing();

	return (
		<AboutContainer>
			<Spacing margin={edgeSpacing.horizontal}>
				<Card title='Settings' icon={iconTypes.gear}>
					<p>Settings</p>
				</Card>
				<Spacing margin={edgeSpacing.top}>
					<Heading1>Hello</Heading1>
				</Spacing>
			</Spacing>
		</AboutContainer>
	);
};

const AboutContainer = tStyled.div`
	max-width: ${LayoutBreakpoint.tablet}px;
	margin: ${spacing.grand.value} auto;
`;