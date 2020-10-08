
import * as React from 'react';
import { decorate } from '@/test/decorate';
import { FilterOverlay } from './filter-overlay';
import { defaultInvalidFilter, IArchiveFilter, isFilterSemanticallyEqual, isFilterSortSemanticallyEqual } from 'oftheday-shared';
import { RegularText } from '@/core/symbol/text';
import { FilterDescription } from '../filter-common';
import { spacing, Spacing } from '@/core/layout/common';
import { FilterPresets } from '../filter-presets';

export default { title: 'Areas/Archive/Filter Overlay' };

export const TestFilterOverlay = decorate('Filter Overlay', null, () => {

	const [filter, setFilter] = React.useState<IArchiveFilter>(defaultInvalidFilter);
	const [hasOpenedOverlayOnce, setHasOpenedOverlayOnce] = React.useState(false);
	const [isShowingPresets, setIsShowingPresets] = React.useState(false);
	const [isOverlayOpen, setIsOverlayOpen] = React.useState(true);
	const [requests, setRequests] = React.useState(0);
	const [renders, setRenders] = React.useState(0);

	function onSetFilter(newFilter: IArchiveFilter) {
		const isEqual = isFilterSemanticallyEqual(filter, newFilter);
		const isSortEqual = isFilterSortSemanticallyEqual(filter, newFilter);

		setFilter(newFilter);
		if (!isEqual) {
			setRequests(p => p + 1);
			setRenders(p => p + 1);
		}
		else if (!isSortEqual) {
			setRenders(p => p + 1);
		}

		onCloseOverlay();
	}

	function onOpenOverlay() {
		setHasOpenedOverlayOnce(true);
		setIsOverlayOpen(true);
	}

	function onCloseOverlay() {
		setIsOverlayOpen(false);
	}

	return (
		<>
			<button onClick={onOpenOverlay}>Open overlay</button>
			<RegularText>
				Requests: {requests}
			</RegularText>
			<RegularText>
				Renders: {renders}
			</RegularText>
			<Spacing margin={spacing.large.vertical}>
				<FilterDescription filter={filter} />
			</Spacing>
			<Spacing show={!hasOpenedOverlayOnce} margin={spacing.large.vertical}>
				<FilterPresets
					selectedFilter={filter}
					onClickPreset={onSetFilter}
				/>
			</Spacing>
			<FilterOverlay
				isActive={isOverlayOpen}
				onSetInactive={onCloseOverlay}
				onFilterSubmit={onSetFilter}
				filter={filter}
				isShowingPresets={isShowingPresets}
				onShowingPresetsChange={setIsShowingPresets}
			/>
		</>
	);
});