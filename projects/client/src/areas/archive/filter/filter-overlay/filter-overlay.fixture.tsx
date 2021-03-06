
import * as React from 'react';
import { wrap } from '@/test/decorate';
import { FilterOverlay } from './filter-overlay';
import { defaultInvalidFilter, IArchiveFilter, isFilterSemanticallyEqual, isFilterSortSemanticallyEqual } from 'oftheday-shared';
import { RegularText } from '@/core/symbol/text';
import { FilterDescription } from '../filter-common';
import { Block } from '@/core/layout/common';

export default wrap(null, () => {

	const [filter, setFilter] = React.useState<IArchiveFilter>(defaultInvalidFilter);
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
			<Block.Elf24 />
			<FilterDescription filter={filter} />
			<Block.Elf24 />
			<FilterOverlay
				isShowingPresetsInitially={false}
				isActive={isOverlayOpen}
				onSetInactive={onCloseOverlay}
				onFilterSubmit={onSetFilter}
				filter={filter}
			/>
		</>
	);
});