import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { spacing, Spacing } from '@/core/layout/common';
import { Subtitle, RegularText } from '@/core/symbol/text';

export interface MilesProps {
	other: IOther;
}

export const Miles: React.FC<MilesProps> = (props) => {
	const { other } = props;
	const { milesByBicycle, milesByFoot } = other;
	if (!milesByBicycle && !milesByFoot) {
		return null;
	}
	const { value, vertical } = spacing.medium;

	return (
		<Spacing margin={value}>
			<Subtitle>Miles of Exercise</Subtitle>
			<RegularText margin={vertical} show={milesByFoot}>{milesByFoot} by foot (walking or running)</RegularText>
			<RegularText margin={vertical} show={milesByBicycle}>{milesByBicycle} by bicycle</RegularText>
		</Spacing>
	);
};
