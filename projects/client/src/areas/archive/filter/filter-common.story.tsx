
import * as React from 'react';
import { decorate } from '@/test/decorate';
import { filterPresets, IArchiveFilter, IArchiveFilterRange, IArchiveFilterSort } from 'oftheday-shared';
import { FilterDescription } from './filter-common';
import { spacing, Spacing } from '@/core/layout/common';

export default { title: 'Areas/Archive/Filter' };

export const TestFilterOverlay = decorate('Filter Description', null, () => {

	const filters: IArchiveFilter[] = [
		filterPresets.allTop,
		filterPresets.allMusic,
		filterPresets.random7Days,
		{
			types: {
				notes: false,
				schedule: false,
				location: false,
				endThoughts: false,
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
			<Spacing key={i} margin={spacing.medium.value}>
				<FilterDescription filter={filter} />
			</Spacing>
		);
	});

	return (
		<>
			{filtersRender}
		</>
	);
});