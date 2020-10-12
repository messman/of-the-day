import { spacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { useArchiveResponseContext } from '@/services/data/data-context';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { IArchiveFilter } from 'oftheday-shared';
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

	const { filter, applyFilter, promise } = useArchiveResponseContext();
	const { data, error, isStarted } = promise;

	const [isOverlayActive, setIsOverlayActive] = React.useState(false);

	function onSetFilter(newFilter: IArchiveFilter) {
		if (newFilter !== filter) {
			applyFilter(newFilter);
		}
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
	if (!data && !error && !isStarted) {
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
				promise={promise}
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
	margin: auto;
	margin-bottom: ${spacing.grand.value};
`;