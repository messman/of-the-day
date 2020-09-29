import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { Spacing, spacing } from '@/core/layout/common';
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
				<Spacing textAlign='center'>
					<Heading3 isMaxLineLength={false}>{milesByFoot} miles</Heading3>
					<RegularText isMaxLineLength={false} margin={spacing.medium.top}>As reported by Andrew's Apple Watch.</RegularText>
					<RegularText isMaxLineLength={false} margin={spacing.nudge.top}>Goal: 500 miles, then 500 more.</RegularText>
				</Spacing>
			</Card>
			<Card title='Bicycling' icon={iconTypes.bicycling}>
				<Spacing textAlign='center'>
					<Heading3 isMaxLineLength={false}>{milesByBicycle} miles</Heading3>
					<RegularText isMaxLineLength={false} margin={spacing.medium.top}>As reported by Andrew's Apple Watch.</RegularText>
				</Spacing>
			</Card>
		</CardGroup>
	);
};
