import * as React from 'react';
import { IArchiveFilter, isFilterValid, keysOfIPostElementType, IArchiveFilterRange, IArchiveFilterPreset, IArchiveFilterSort, IPostElementType, IArchiveFilterModifier, isFilterExactlyEqual, filterPresets } from 'oftheday-shared';
import { RegularText } from '@/core/symbol/text';
import { FontWeight } from '@/core/style/theme';
import { tStyled } from '@/core/style/styled';

export const postElementTypeForDisplay: Record<keyof typeof IPostElementType, string> = {
	notes: 'Notes',
	schedule: 'Schedules',
	location: 'Locations',
	endThoughts: 'End-Of-Day Thoughts',
	music: 'Music',
	video: 'Video',
	image: 'Images',
	quote: 'Quotes',
	custom: 'Other Items'
};

export const archiveFilterModifiersForDisplay: Record<keyof typeof IArchiveFilterModifier, string> = {
	includeOnlyWithTopTag: 'Top Tag',
	excludeWithNSFWTag: 'No NSFW Tag'
};

export const archiveFilterRangeForDisplay: Record<keyof typeof IArchiveFilterRange, string> = {
	random7Days: 'A Random Week',
	last7Days: 'The Last 7 Days',
	last31Days: 'The Last Month',
	last93Days: 'The Last 3 Months',
	all: 'All Time',
};

export const archiveFilterPresetForDisplay: Record<keyof typeof IArchiveFilterPreset, string> = {
	random7Days: 'Random Week',
	allTop: 'All Top Items',
	allMusic: 'All Music',
	allVideo: 'All Video',
};

export const archiveFilterSortForDisplay: Record<keyof typeof IArchiveFilterSort, string> = {
	dayIncreasing: 'By Day - Increasing',
	dayDecreasing: 'By Day - Decreasing',
	dayRandom: 'By Day - Randomly',
	musicArtistIncreasing: 'By Music Artist',
};

interface FilterDescriptor {
	preset: string | null;
	types: string;
	modifiers: string;
	range: string;
	sort: string;
}

function describeFilter(filter: IArchiveFilter): FilterDescriptor {

	const typesAsTextArray = keysOfIPostElementType
		.filter((type) => {
			return !!filter.types[type];
		})
		.map((type) => {
			return postElementTypeForDisplay[type];
		});
	let typesAsText = '';
	const numberOfTypes = typesAsTextArray.length;
	if (numberOfTypes <= 2) {
		typesAsText = typesAsTextArray.join(' & ');
	}
	else {
		// We know we have at least 3 items.
		for (let i = 0; i < numberOfTypes; i++) {
			let end = '';
			if (i === numberOfTypes - 2) {
				end = ', & ';
			}
			else if (i === numberOfTypes - 1) {
				end = '';
			}
			else {
				end = ', ';
			}
			typesAsText += typesAsTextArray[i] + end;
		}
	}

	const modifiersAsText = [
		filter.modifiers.includeOnlyWithTopTag ? archiveFilterModifiersForDisplay.includeOnlyWithTopTag : null,
		filter.modifiers.excludeWithNSFWTag ? archiveFilterModifiersForDisplay.excludeWithNSFWTag : null,
	]
		.filter(i => !!i).join(' & ');

	const rangeText = archiveFilterRangeForDisplay[IArchiveFilterRange[filter.range] as keyof typeof IArchiveFilterRange];

	const sortText = archiveFilterSortForDisplay[IArchiveFilterSort[filter.sort] as keyof typeof IArchiveFilterSort];

	const presetText = filter.preset !== undefined ? archiveFilterPresetForDisplay[IArchiveFilterPreset[filter.preset] as keyof typeof IArchiveFilterPreset] : null;

	return {
		types: typesAsText,
		modifiers: modifiersAsText,
		range: rangeText,
		sort: sortText,
		preset: presetText
	};
}

export interface FilterDescriptionProps {
	filter: IArchiveFilter;
}

export const FilterDescription: React.FC<FilterDescriptionProps> = (props) => {
	const { filter } = props;

	const filterDescriptor = React.useMemo(() => {
		return describeFilter(filter);
	}, [filter]);

	const isValid = isFilterValid(filter);
	if (!isValid) {
		return (
			<RegularText>The filter options selected will not return any data.</RegularText>
		);
	}

	const { preset, types, modifiers, range, sort } = filterDescriptor;

	const startText = 'Filter to ';
	let start: JSX.Element = null!;
	if (preset) {
		start = (
			<div>
				<BreakSpan>{startText}</BreakSpan>
				<BreakText fontWeight={FontWeight.extraBold}>{preset}</BreakText>
				<BreakSpan>: </BreakSpan>
			</div>
		);
	}
	else {
		start = (
			<BreakSpan>{startText}</BreakSpan>
		);
	}

	const modifierSection = modifiers ? (
		<>
			<BreakSpan>with </BreakSpan>
			<BreakText fontWeight={FontWeight.bold}>{modifiers} </BreakText>
		</>
	) : null;

	return (
		<div>
			{start}
			<BreakText fontWeight={FontWeight.bold}>{types} </BreakText>
			{modifierSection}
			<BreakSpan>for </BreakSpan>
			<BreakText fontWeight={FontWeight.bold}>{range} </BreakText>
			<BreakSpan>sorted </BreakSpan>
			<BreakText fontWeight={FontWeight.bold}>{sort}</BreakText>
		</div>
	);
};

const BreakText = tStyled(RegularText)`
	display: inline;
`;
const BreakSpan = tStyled.span`
	display: inline;
`;

/** Sets the preset for a filter if it matches any of the presets. */
export function matchToPreset(filter: IArchiveFilter): void {
	if (filter.preset !== undefined) {
		return;
	}
	const filterPresetKeys = Object.keys(filterPresets);
	for (let i = 0; i < filterPresetKeys.length; i++) {
		const filterPreset = filterPresets[filterPresetKeys[i] as keyof typeof IArchiveFilterPreset];
		if (isFilterExactlyEqual(filter, filterPreset, false)) {
			filter.preset = filterPreset.preset;
			return;
		}
	}
}

export function isOnlyMusicTypeSelected(filter: IArchiveFilter): boolean {
	return keysOfIPostElementType.every((key) => {
		const isSelected = !!filter.types[key];
		return key === IPostElementType[IPostElementType.music] ? isSelected : !isSelected;
	});
}