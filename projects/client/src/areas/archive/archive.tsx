import { spacing, Spacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { RegularText } from '@/core/symbol/text';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { defaultInvalidFilter, IArchiveFilter, isFilterSemanticallyEqual, isFilterSortSemanticallyEqual } from 'oftheday-shared';
import * as React from 'react';
import { FilterDescription } from './filter-common';
import { FilterOverlay } from './filter-overlay/filter-overlay';

export interface ArchiveProps {

}

export const Archive: React.FC<ArchiveProps> = () => {

	const [filter, setFilter] = React.useState<IArchiveFilter>(defaultInvalidFilter);
	const [isOverlayOpen, setIsOverlayOpen] = React.useState(false);
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
		<ArchiveContainer>
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
			<FilterOverlay
				isActive={isOverlayOpen}
				onSetInactive={onCloseOverlay}
				onFilterSubmit={onSetFilter}
				filter={filter}
			/>
		</ArchiveContainer>
	);
};

const ArchiveContainer = tStyled.div`
	max-width: ${LayoutBreakpoint.tablet}px;
	margin: ${spacing.grand.value} auto;
`;