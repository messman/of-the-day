import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { spacing } from '@/core/layout/common';
import { Heading3, RegularText } from '@/core/symbol/text';
import { CardGroup } from '@/core/card/card-group';
import { Card } from '@/core/card/card';
import { iconTypes } from '@/core/symbol/icon';

export interface MilesProps {
	other: IOther;
}

export const Miles: React.FC<MilesProps> = (props) => {
	const { other } = props;
	const { milesByBicycle, milesByFoot } = other;
	if (!milesByBicycle && !milesByFoot) {
		return null;
	}

	return (
		<CardGroup title='Fitness' isAutoAlternateBackground={true}>
			<Card title='Walking/Running' icon={iconTypes.activity}>
				<Heading3>{milesByFoot} miles</Heading3>
				<RegularText margin={spacing.medium.top}>As reported by Andrew's Apple Watch.</RegularText>
			</Card>
			<Card title='Bicycling' icon={iconTypes.bicycling}>
				<Heading3>{milesByBicycle} miles</Heading3>
				<RegularText margin={spacing.medium.top}>As reported by Andrew's Apple Watch.</RegularText>
			</Card>
		</CardGroup>
	);
};
