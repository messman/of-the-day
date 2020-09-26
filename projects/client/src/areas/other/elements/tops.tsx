import * as React from 'react';
import { IOther, IOtherCount } from 'oftheday-shared';
import { spacing, Spacing } from '@/core/layout/common';
import { RegularText, Heading2 } from '@/core/symbol/text';

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

	const { horizontal } = spacing.medium;

	return (
		<Spacing margin={horizontal}>
			<Heading2>{label}</Heading2>
			<RegularText>{countsText}</RegularText>
		</Spacing>
	);
};