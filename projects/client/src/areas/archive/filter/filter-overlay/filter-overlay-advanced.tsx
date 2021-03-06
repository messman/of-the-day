import * as React from 'react';
import { cloneFilter, IPostElementType, keysOfFilterRange, IArchiveFilterRange, keysOfFilterSort, IArchiveFilterSort, IArchiveFilter } from 'oftheday-shared';
import { Spacing, Block } from '@/core/layout/common';
import { Heading3 } from '@/core/symbol/text';
import { Checkbox, OpenSelect, OpenSelectOption } from './filter-overlay-forms';
import { archiveFilterModifiersForDisplay, archiveFilterRangeForDisplay, archiveFilterSortForDisplay, isOnlyMusicTypeSelected, postElementTypeForDisplay } from '../filter-common';
import { FilterOverlayTabProps } from './filter-overlay';
import { tStyled } from '@/core/style/styled';

/**
 * The 'Advanced' tab UI for the filter overlay, which has controls for choosing
 * the exact types and range and sort for the filter.
*/
export const FilterOverlayAdvanced: React.FC<FilterOverlayTabProps> = (props) => {

	const { filterWorkingCopy, onFilterWorkingCopyChanged } = props;

	function onTypeChange(type: IPostElementType): (value: boolean) => void {
		return function (value: boolean) {
			const newFilter = cloneFilterWithoutPreset(filterWorkingCopy);
			const key = IPostElementType[type] as keyof typeof IPostElementType;
			newFilter.types[key] = value;

			if (newFilter.sort === IArchiveFilterSort.musicArtistIncreasing && !isOnlyMusicTypeSelected(newFilter)) {
				newFilter.sort = IArchiveFilterSort.dayDecreasing;
			}

			onFilterWorkingCopyChanged(newFilter);
		};
	}

	function onTopTagModifierChange(value: boolean) {
		const newFilter = cloneFilterWithoutPreset(filterWorkingCopy);
		newFilter.modifiers.includeOnlyWithTopTag = value;
		onFilterWorkingCopyChanged(newFilter);
	}
	function onNSFWTagModifierChange(value: boolean) {
		const newFilter = cloneFilterWithoutPreset(filterWorkingCopy);
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
		const newFilter = cloneFilterWithoutPreset(filterWorkingCopy);
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
		const newFilter = cloneFilterWithoutPreset(filterWorkingCopy);
		newFilter.sort = value as IArchiveFilterSort;
		onFilterWorkingCopyChanged(newFilter);
	}

	return (
		<>
			<div>
				<Heading3>See</Heading3>
				<CheckboxesContainer>
					<Checkbox value={filterWorkingCopy.types.music} onValueChange={onTypeChange(IPostElementType.music)}>{postElementTypeForDisplay.music}</Checkbox>
					<Checkbox value={filterWorkingCopy.types.video} onValueChange={onTypeChange(IPostElementType.video)}>{postElementTypeForDisplay.video}</Checkbox>
					<Checkbox value={filterWorkingCopy.types.image} onValueChange={onTypeChange(IPostElementType.image)}>{postElementTypeForDisplay.image}</Checkbox>
					<Checkbox value={filterWorkingCopy.types.quote} onValueChange={onTypeChange(IPostElementType.quote)}>{postElementTypeForDisplay.quote}</Checkbox>
					<Checkbox value={filterWorkingCopy.types.custom} onValueChange={onTypeChange(IPostElementType.custom)}>{postElementTypeForDisplay.custom}</Checkbox>
				</CheckboxesContainer>
			</div>
			<Block.Elf24 />
			<div>
				<Heading3>With</Heading3>
				<CheckboxesContainer>
					<Checkbox value={filterWorkingCopy.modifiers.includeOnlyWithTopTag} onValueChange={onTopTagModifierChange}>{archiveFilterModifiersForDisplay.includeOnlyWithTopTag}</Checkbox>
					<Checkbox value={filterWorkingCopy.modifiers.excludeWithNSFWTag} onValueChange={onNSFWTagModifierChange}>{archiveFilterModifiersForDisplay.excludeWithNSFWTag}</Checkbox>
				</CheckboxesContainer>
			</div>
			<Block.Elf24 />
			<div>
				<Heading3>For</Heading3>
				<Block.Bat08 />
				<OpenSelect
					options={rangeOptions}
					selectedIndex={filterWorkingCopy.range}
					onSelectedIndexChange={onRangeChange}
				/>
			</div>
			<Block.Elf24 />
			<div>
				<Heading3>Sorted</Heading3>
				<Block.Bat08 />
				<OpenSelect
					options={sortOptions}
					selectedIndex={filterWorkingCopy.sort}
					onSelectedIndexChange={onSortChange}
				/>
			</div>
		</>
	);
};

const CheckboxesContainer = tStyled.div`
	${Checkbox} {
		margin-top: ${Spacing.bat08};
	}
`;

function cloneFilterWithoutPreset(filter: IArchiveFilter): IArchiveFilter {
	const clonedFilter = cloneFilter(filter);
	clonedFilter.preset = undefined;
	return clonedFilter;
}