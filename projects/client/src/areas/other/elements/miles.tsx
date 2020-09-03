import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { LabelValue, Value } from '@/core/layout/common';
import { largerSpacing } from '@/core/style/common';

export interface MilesProps {
	other: IOther;
}

export const Miles: React.FC<MilesProps> = (props) => {
	const { other } = props;
	const { milesByBicycle, milesByFoot } = other;
	if (!milesByBicycle && !milesByFoot) {
		return null;
	}
	const { vertical } = largerSpacing;

	return (
		<LabelValue margin={largerSpacing.value} label='Miles of exercise'>
			<Value margin={vertical} show={milesByFoot}>{milesByFoot} by foot (walking or running)</Value>
			<Value margin={vertical} show={milesByBicycle}>{milesByBicycle} by bicycle</Value>
		</LabelValue>
	);
};
