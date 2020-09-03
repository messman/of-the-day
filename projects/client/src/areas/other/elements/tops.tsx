import * as React from 'react';
import { IOther, IOtherCount } from 'oftheday-shared';
import { LabelValue, DynamicMargin } from '@/core/layout/common';
import { spacing } from '@/core/style/common';
import { Text } from '@/core/symbol/text';

export interface TopsProps {
	other: IOther;
}

export const Tops: React.FC<TopsProps> = (props) => {
	const { other } = props;
	const { topArtists, topDayTypes, topLocations } = other;
	if (!topArtists && !topDayTypes && !topLocations) {
		return null;
	}

	return (
		<>
			<Top label='Artists' count={topArtists} />
			<Top label='Day Types' count={topDayTypes} />
			<Top label='Locations' count={topLocations} />
		</>
	);
};

interface TopProps {
	label: string;
	count: IOtherCount[] | undefined;
}

const Top: React.FC<TopProps> = (props) => {
	const { label, count } = props;
	if (!count || !count.length) {
		return null;
	}

	const countsText = count.map((item) => {
		return `${item.text} (${item.count})`;
	}).join(', ');

	const { horizontal, vertical } = spacing.medium;

	return (
		<DynamicMargin margin={horizontal}>
			<LabelValue margin={vertical} label={label}>
				<Text>{countsText}</Text>
			</LabelValue>
		</DynamicMargin>
	);
};