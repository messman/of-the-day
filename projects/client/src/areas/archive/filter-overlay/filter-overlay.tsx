import * as React from 'react';
import { ActionLink } from '@/core/link';
import { OverlayBox } from '@/core/overlay/overlay';
import { ManagedOverlayBoxProps } from '@/services/overlay/overlay-manager';
import { FlexColumn, FlexRow } from '@messman/react-common';
import { IArchiveFilter, cloneFilter, IPostElementType, keysOfFilterRange, IArchiveFilterRange, keysOfFilterSort, IArchiveFilterSort } from 'oftheday-shared';
import { tStyled } from '@/core/style/styled';
import { Spacing, spacing } from '@/core/layout/common';
import { Heading3 } from '@/core/symbol/text';
import { Checkbox, OpenSelect, OpenSelectOption } from './filter-overlay-forms';
import { archiveFilterModifiersForDisplay, archiveFilterRangeForDisplay, archiveFilterSortForDisplay, isOnlyMusicTypeSelected, matchToPreset, postElementTypeForDisplay } from '../filter-common';

export interface FilterOverlayProps extends ManagedOverlayBoxProps {
	filter: IArchiveFilter;
	onFilterSubmit: (filter: IArchiveFilter) => void;
}

export const FilterOverlay: React.FC<FilterOverlayProps> = (props) => {

	const { isActive, onSetInactive, filter, onFilterSubmit } = props;

	const [filterWorkingCopy, setFilterWorkingCopy] = React.useState(() => {
		return cloneFilter(filter);
	});

	React.useEffect(() => {
		setFilterWorkingCopy(cloneFilter(filter));
	}, [filter, isActive]);


	function onSubmit() {
		onFilterSubmit(filterWorkingCopy);
	}

	function onFilterWorkingCopyChanged(newFilter: IArchiveFilter): void {
		matchToPreset(newFilter);
		setFilterWorkingCopy(newFilter);
	}

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
		<OverlayBox
			isActive={isActive}
			onSetInactive={onSetInactive}
			headerTitle='Filter'
			isSetInactiveOnBackdropClick={false}
		>
			<ScrollFlexColumn>
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
			</ScrollFlexColumn>
			<Footer>
				<FooterActionLink onClick={onSetInactive}>Cancel</FooterActionLink>
				<FooterActionLink onClick={onSubmit}>Submit</FooterActionLink>
			</Footer>
		</OverlayBox>
	);
};

const ScrollFlexColumn = tStyled(FlexColumn)`
	overflow-y: auto;
	margin: ${spacing.medium.value};
`;

const Footer = tStyled(FlexRow)`
	border-top: 1px solid ${p => p.theme.color.bgComponent3};
`;

const FooterActionLink = tStyled(ActionLink)`
	flex: 1;
	text-align: center;
	padding: ${spacing.medium.value};
`;
