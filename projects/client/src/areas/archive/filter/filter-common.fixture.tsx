
import * as React from 'react';
import { wrap } from '@/test/decorate';
import { filterPresets, IArchiveFilter, IArchiveFilterRange, IArchiveFilterSort } from 'oftheday-shared';
import { FilterDescription } from './filter-common';
import { Margin } from '@/core/layout/common';

export default wrap(null, () => {

	const filters: IArchiveFilter[] = [
		filterPresets.recentTop,
		filterPresets.recentMusic,
		filterPresets.random7Days,
		{
			types: {
				personal: false,
				music: true,
				video: false,
				image: true,
				quote: false,
				custom: false
			},
			modifiers: {
				excludeWithNSFWTag: true,
				includeOnlyWithTopTag: false
			},
			range: IArchiveFilterRange.last93Days,
			sort: IArchiveFilterSort.dayIncreasing
		}
	];

	const filtersRender = filters.map((filter, i) => {
		return (
			<Margin.Dog16 key={i}>
				<FilterDescription filter={filter} />
			</Margin.Dog16>
		);
	});

	return (
		<>
			{filtersRender}
		</>
	);
});