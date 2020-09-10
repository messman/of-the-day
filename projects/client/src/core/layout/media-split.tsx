import * as React from 'react';
import { tStyled } from '../style/styled';
import { Flex, FlexRow } from '@messman/react-common';
import { spacing, Spacing } from './common';
import { Center } from '../style/common';

export interface MediaSplitProps {
	isMediaOnRight: boolean;
	mediaRender: JSX.Element;
}

export const MediaSplit: React.FC<MediaSplitProps> = (props) => {
	const { isMediaOnRight, mediaRender, children } = props;

	const spacingBetween = isMediaOnRight ? spacing.large.left : spacing.large.right;

	return (
		<FlexRow>
			<Flex>
				<Center>
					{children}
				</Center>
			</Flex>
			<OrderedFlex isOnRight={isMediaOnRight}>
				<Spacing margin={spacingBetween}>
					{mediaRender}
				</Spacing>
			</OrderedFlex>
		</FlexRow>
	);
};

interface OrderedFlexProps {
	isOnRight: boolean;
}

const OrderedFlex = tStyled.div<OrderedFlexProps>`
	flex: 2;
	order: ${p => p.isOnRight ? 1 : -1}
`;