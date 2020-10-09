import { spacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { defaultInvalidFilter, IArchiveFilter } from 'oftheday-shared';
import * as React from 'react';
import { ArchiveInitial } from './archive-initial';
import { ArchiveResults } from './archive-results';
import { FilterOverlay } from './filter/filter-overlay/filter-overlay';

export interface ArchiveProps {
	offsetPixels: number;
	rootElement: HTMLElement | null;
	onScrollTop: () => void;
}

export const Archive: React.FC<ArchiveProps> = (props) => {
	const { rootElement, onScrollTop, offsetPixels } = props;

	const [filterState, setFilterState] = React.useState({
		filter: defaultInvalidFilter,
		hasFilterChangedOnce: false
	});
	const [isOverlayActive, setIsOverlayActive] = React.useState(false);

	const { filter, hasFilterChangedOnce } = filterState;

	function onSetFilter(filter: IArchiveFilter) {
		setFilterState((p) => {
			if (p.filter === filter) {
				return p;
			}
			return {
				filter: filter,
				hasFilterChangedOnce: true
			};
		});
		onCloseOverlay();
		onScrollTop();
	}

	function onOpenOverlay() {
		setIsOverlayActive(true);
	}

	function onCloseOverlay() {
		setIsOverlayActive(false);
	}

	let render: JSX.Element = null!;
	if (!hasFilterChangedOnce) {
		render = (
			<ArchiveInitial
				onClickPreset={onSetFilter}
				onClickOverlayOpen={onOpenOverlay}
			/>
		);
	}
	else {
		render = (
			<ArchiveResults
				filter={filter}
				onClickEditFilter={onOpenOverlay}
				offsetPixels={offsetPixels}
				rootElement={rootElement}
				onScrollTop={onScrollTop}
			/>
		);
	}

	return (
		<ArchiveContainer>
			{render}
			<FilterOverlay
				isActive={isOverlayActive}
				onSetInactive={onCloseOverlay}
				onFilterSubmit={onSetFilter}
				filter={filter}
				isShowingPresetsInitially={false}
			/>
		</ArchiveContainer>
	);
};

const ArchiveContainer = tStyled.div`
	max-width: ${LayoutBreakpoint.tablet}px;
	margin: ${spacing.grand.value} auto;
`;