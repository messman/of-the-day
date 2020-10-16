import { EmptySpaceHack } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { useArchiveResponseContext } from '@/services/data/data-context';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { IArchiveFilter } from 'oftheday-shared';
import * as React from 'react';
import { elementScrollIntoView } from 'seamless-scroll-polyfill';
import { ArchiveInitial } from './archive-initial';
import { ArchiveResults } from './archive-results';
import { FilterOverlay } from './filter/filter-overlay/filter-overlay';

export interface ArchiveProps {
	offsetPixels: number;
	rootElement: HTMLElement | null;
}

/**
 * Top-level layout component for the Archive page.
 */
export const Archive: React.FC<ArchiveProps> = (props) => {
	const { rootElement, offsetPixels } = props;

	// Get the promise for the archive request, which uses the filter.
	const { filter, applyFilter, promise } = useArchiveResponseContext();
	const { data, error, isStarted } = promise;

	const [isOverlayActive, setIsOverlayActive] = React.useState(false);

	const elementIntersectRef = React.useRef<HTMLDivElement>(null!);
	function scrollToHeader() {
		elementScrollIntoView(elementIntersectRef.current, {});
	}

	function onSetFilter(newFilter: IArchiveFilter) {
		if (newFilter !== filter) {
			applyFilter(newFilter);
		}
		onCloseOverlay();
		scrollToHeader();
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
				onScrollToHeader={scrollToHeader}
			/>
		);
	}

	return (
		<ArchiveContainer>
			<EmptySpaceHack ref={elementIntersectRef} height={offsetPixels} />
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
	max-width: ${LayoutBreakpoint.mobileLarge}px;
	margin: auto;
`;