import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { Spacing, TopMargin } from '@/core/layout/common';
import { Heading3, RegularText } from '@/core/symbol/text';
import { CardGroup } from '@/core/card/card-group';
import { Card, CardPadding } from '@/core/card/card';
import { iconTypes } from '@/core/symbol/icon';
import { EqualCardFlow } from '@/core/card/card-flow';

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
			<EqualCardFlow>
				<Card title='Walking/Running' icon={iconTypes.activity}>
					<CardPadding>
						<Spacing textAlign='center'>
							<Heading3>{milesByFoot} miles</Heading3>
							<TopMargin.Medium>
								<RegularText>As reported by Apple Watch.</RegularText>
							</TopMargin.Medium>
							<TopMargin.Nudge>
								<RegularText>Goal: 500 miles, then 500 more.</RegularText>
							</TopMargin.Nudge>
						</Spacing>
					</CardPadding>
				</Card>
				<Card title='Bicycling' icon={iconTypes.bicycling}>
					<CardPadding>
						<Spacing textAlign='center'>
							<Heading3>{milesByBicycle} miles</Heading3>
							<TopMargin.Medium>
								<RegularText>As reported by Apple Watch.</RegularText>
							</TopMargin.Medium>
						</Spacing>
					</CardPadding>
				</Card>
			</EqualCardFlow>
		</CardGroup>
	);
};
