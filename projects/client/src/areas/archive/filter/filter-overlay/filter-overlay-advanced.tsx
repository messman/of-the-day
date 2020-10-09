import * as React from 'react';
import { cloneFilter, IPostElementType, keysOfFilterRange, IArchiveFilterRange, keysOfFilterSort, IArchiveFilterSort } from 'oftheday-shared';
import { Spacing, spacing } from '@/core/layout/common';
import { Heading3 } from '@/core/symbol/text';
import { Checkbox, OpenSelect, OpenSelectOption } from './filter-overlay-forms';
import { archiveFilterModifiersForDisplay, archiveFilterRangeForDisplay, archiveFilterSortForDisplay, isOnlyMusicTypeSelected, postElementTypeForDisplay } from '../filter-common';
import { FilterOverlayTabProps } from './filter-overlay';

export const FilterOverlayAdvanced: React.FC<FilterOverlayTabProps> = (props) => {

	const { filterWorkingCopy, onFilterWorkingCopyChanged } = props;

	function onTypeChange(type: IPostElementType): (value: boolean) => void {
		return function (value: boolean) {
			const newFilter = cloneFilter(filterWorkingCopy);
			const key = IPostElementType[type] as keyof typeof IPostElementType;
			newFilter.types[key] = value;

			if (newFilter.sort === IArchiveFilterSort.musicArtistIncreasing && !isOnlyMusicTypeSelected(newFilter)) {
				newFilter.sort = IArchiveFilterSort.dayDecreasing;
			}

			onFilterWorkingCopyChanged(newFilter);
		};
	}

	function onTopTagModifierChange(value: boolean) {
		const newFilter = cloneFilter(filterWorkingCopy);
		newFilter.modifiers.includeOnlyWithTopTag = value;
		onFilterWorkingCopyChanged(newFilter);
	}
	function onNSFWTagModifierChange(value: boolean) {
		const newFilter = cloneFilter(filterWorkingCopy);
		newFilter.modifiers.excludeWithNSFWTag = value;
		onFilterWorkingCopyChanged(newFilter);
	}

	const rangeOptions = keysOfFilterRange.map<OpenSelectOption>((key) => {
		return {
			isDisabled: false,
			value: archiveFilterRangeForDisplay[key]
		};
	});

	function onRangeChange(value: number) {
		const newFilter = cloneFilter(filterWorkingCopy);
		newFilter.range = value as IArchiveFilterRange;
		onFilterWorkingCopyChanged(newFilter);
	}

	const isOnlyMusicSelected = isOnlyMusicTypeSelected(filterWorkingCopy);
	const sortOptions = keysOfFilterSort.map<OpenSelectOption>((key) => {
		const isDisabled = !isOnlyMusicSelected && key === IArchiveFilterSort[IArchiveFilterSort.musicArtistIncreasing];

		return {
			isDisabled: isDisabled,
			value: archiveFilterSortForDisplay[key]
		};
	});

	function onSortChange(value: number) {
		const newFilter = cloneFilter(filterWorkingCopy);
		newFilter.sort = value as IArchiveFilterSort;
		onFilterWorkingCopyChanged(newFilter);
	}

	return (
		<>
			<Spacing margin={spacing.large.bottom}>
				<Heading3>See</Heading3>
				<Spacing margin={spacing.small.top}>
					<Checkbox value={filterWorkingCopy.types.music} onValueChange={onTypeChange(IPostElementType.music)}>{postElementTypeForDisplay.music}</Checkbox>
				</Spacing>
				<Spacing margin={spacing.small.top}>
					<Checkbox value={filterWorkingCopy.types.video} onValueChange={onTypeChange(IPostElementType.video)}>{postElementTypeForDisplay.video}</Checkbox>
				</Spacing>
				<Spacing margin={spacing.small.top}>
					<Checkbox value={filterWorkingCopy.types.image} onValueChange={onTypeChange(IPostElementType.image)}>{postElementTypeForDisplay.image}</Checkbox>
				</Spacing>
				<Spacing margin={spacing.small.top}>
					<Checkbox value={filterWorkingCopy.types.quote} onValueChange={onTypeChange(IPostElementType.quote)}>{postElementTypeForDisplay.quote}</Checkbox>
				</Spacing>
				<Spacing margin={spacing.small.top}>
					<Checkbox value={filterWorkingCopy.types.custom} onValueChange={onTypeChange(IPostElementType.custom)}>{postElementTypeForDisplay.custom}</Checkbox>
				</Spacing>
			</Spacing>
			<Spacing margin={spacing.large.bottom}>
				<Heading3>With</Heading3>
				<Spacing margin={spacing.small.top}>
					<Checkbox value={filterWorkingCopy.modifiers.includeOnlyWithTopTag} onValueChange={onTopTagModifierChange}>{archiveFilterModifiersForDisplay.includeOnlyWithTopTag}</Checkbox>
				</Spacing>
				<Spacing margin={spacing.small.top}>
					<Checkbox value={filterWorkingCopy.modifiers.excludeWithNSFWTag} onValueChange={onNSFWTagModifierChange}>{archiveFilterModifiersForDisplay.excludeWithNSFWTag}</Checkbox>
				</Spacing>
			</Spacing>
			<Spacing margin={spacing.large.bottom}>
				<Heading3>For</Heading3>
				<Spacing margin={spacing.small.top}>

					<OpenSelect
						options={rangeOptions}
						selectedIndex={filterWorkingCopy.range}
						onSelectedIndexChange={onRangeChange}
					/>
				</Spacing>
			</Spacing>
			<Spacing margin={spacing.large.bottom}>
				<Heading3>Sorted</Heading3>
				<Spacing margin={spacing.small.top}>
					<OpenSelect
						options={sortOptions}
						selectedIndex={filterWorkingCopy.sort}
						onSelectedIndexChange={onSortChange}
					/>
				</Spacing>
			</Spacing>
		</>
	);
};