import * as React from 'react';
import { ActionLink } from '@/core/link';
import { OverlayBox } from '@/core/overlay/overlay';
import { ManagedOverlayBoxProps } from '@/services/overlay/overlay-manager';
import { FlexColumn, FlexRow } from '@messman/react-common';
import { IArchiveFilter, cloneFilter, IPostElementType, keysOfFilterRange, IArchiveFilterRange, keysOfFilterSort, IArchiveFilterSort, isFilterValid } from 'oftheday-shared';
import { tStyled } from '@/core/style/styled';
import { Spacing, spacing } from '@/core/layout/common';
import { FontSize, Heading3, RegularText } from '@/core/symbol/text';
import { Checkbox, OpenSelect, OpenSelectOption } from './filter-overlay-forms';
import { archiveFilterModifiersForDisplay, archiveFilterRangeForDisplay, archiveFilterSortForDisplay, isOnlyMusicTypeSelected, matchToPreset, postElementTypeForDisplay } from '../filter-common';
import { Icon, iconTypes } from '@/core/symbol/icon';

export interface FilterOverlayProps extends ManagedOverlayBoxProps {
	filter: IArchiveFilter;
	onFilterSubmit: (filter: IArchiveFilter) => void;
	isShowingPresets: boolean;
	onShowingPresetsChange: (isShowingPresets: boolean) => void;
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

	const invalidWarning = !isFilterValid(filterWorkingCopy) ? (
		<RegularText isMaxLineLength={false} textAlign='center' margin={spacing.medium.value}>
			<Spacing isInline={true} margin={spacing.small.right}>
				<Icon type={iconTypes.alert} fillColor={c => c.warning} height={FontSize.textRegular} />
			</Spacing>
			This won't return anything.
		</RegularText>
	) : null;

	return (
		<OverlayBox
			isActive={isActive}
			onSetInactive={onSetInactive}
			headerTitle='Filter'
			isSetInactiveOnBackdropClick={false}
		>
			<TabHeaderContainer>

			</TabHeaderContainer>
			<FilterOverlayAdvanced
				filterWorkingCopy={filterWorkingCopy}
				onFilterWorkingCopyChanged={onFilterWorkingCopyChanged}
			/>
			{invalidWarning}
			<Footer>
				<FooterActionLink onClick={onSetInactive}>Cancel</FooterActionLink>
				<FooterActionLink onClick={onSubmit}>Submit</FooterActionLink>
			</Footer>
		</OverlayBox>
	);
};

const TabHeaderContainer = tStyled.div`
	position: relative;
`;

interface FilterOverlayTabProps {
	filterWorkingCopy: IArchiveFilter;
	onFilterWorkingCopyChanged: (newFilter: IArchiveFilter) => void;
}

const FilterOverlayAdvanced: React.FC<FilterOverlayTabProps> = (props) => {

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
		<ScrollFlexColumn>
			<Spacing margin={spacing.medium.bottom}>
				<RegularText>
					Notes, schedules, locations, and end-of-day thoughts are not accessible in the archive.
					</RegularText>
			</Spacing>
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
	);
};

const ScrollFlexColumn = tStyled(FlexColumn)`
	overflow-y: auto;
	padding: ${spacing.medium.value};
`;

const Footer = tStyled(FlexRow)`
	border-top: 1px solid ${p => p.theme.color.bgComponent3};
`;

const FooterActionLink = tStyled(ActionLink)`
	flex: 1;
	text-align: center;
	padding: ${spacing.medium.value};
`;
