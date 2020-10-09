import { spacing, Spacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { RegularText } from '@/core/symbol/text';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { IArchiveFilter, isFilterSemanticallyEqual, isFilterSortSemanticallyEqual } from 'oftheday-shared';
import * as React from 'react';
import { FilterDescription } from './filter/filter-common';

export interface ArchiveResultsProps {
	filter: IArchiveFilter;
}

export const ArchiveResults: React.FC<ArchiveResultsProps> = (props) => {
	const { filter } = props;

	const [localFilter, setLocalFilter] = React.useState(filter);
	const [requests, setRequests] = React.useState(0);
	const [renders, setRenders] = React.useState(0);

	React.useEffect(() => {
		if (localFilter === filter) {
			return;
		}
		const isEqual = isFilterSemanticallyEqual(filter, localFilter);
		const isSortEqual = isFilterSortSemanticallyEqual(filter, localFilter);
		setLocalFilter(filter);

		if (!isEqual) {
			setRequests(p => p + 1);
			setRenders(p => p + 1);
		}
		else if (!isSortEqual) {
			setRenders(p => p + 1);
		}
	}, [filter]);

	return (
		<ArchiveContainer>
			<RegularText>
				Requests: {requests}
			</RegularText>
			<RegularText>
				Renders: {renders}
			</RegularText>
			<Spacing margin={spacing.large.vertical}>
				<FilterDescription filter={filter} />
			</Spacing>
		</ArchiveContainer>
	);
};

const ArchiveContainer = tStyled.div`
	max-width: ${LayoutBreakpoint.tablet}px;
	margin: ${spacing.grand.value} auto;
`;