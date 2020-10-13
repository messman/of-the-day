import * as React from 'react';
import { IOther, IOtherCount } from 'oftheday-shared';
import { RegularText, Heading3 } from '@/core/symbol/text';
import { CardGroup } from '@/core/card/card-group';
import { iconTypes, SVGIconType } from '@/core/symbol/icon';
import { Card, CardPadding } from '@/core/card/card';
import { spacing } from '@/core/layout/common';
import { EqualCardFlow } from '@/core/card/card-flow';

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
		<CardGroup title='Trends'>
			<EqualCardFlow>
				<Top title='Music Artists' count={topArtists} icon={iconTypes.music} />
				<Top title='Day Tags' count={topDayTypes} icon={iconTypes.calendar} />
				<Top title='Locations' count={topLocations} icon={iconTypes.compass} />
			</EqualCardFlow>
		</CardGroup>
	);
};

interface TopProps {
	title: string;
	count: IOtherCount[] | undefined;
	icon: SVGIconType;
}

const Top: React.FC<TopProps> = (props) => {
	const { title, count, icon } = props;
	if (!count || !count.length) {
		return null;
	}

	const [firstCount, ...otherCounts] = count;

	const countsText = otherCounts.map((count) => {
		return <RegularText isMaxLineLength={false} textAlign='center' margin={spacing.medium.top}>{createCountText(count)}</RegularText>;
	});

	return (
		<Card title={title} icon={icon}>
			<CardPadding>
				<Heading3 isMaxLineLength={false} textAlign='center'>{createCountText(firstCount)}</Heading3>
				{countsText}
			</CardPadding>
		</Card>
	);
};

function createCountText(count: IOtherCount): JSX.Element {
	return <>{count.text} &middot; {count.count}</>;
}