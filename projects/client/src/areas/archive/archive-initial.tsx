import { Spacing, spacing, useResponsiveEdgeSpacing } from '@/core/layout/common';
import { SeeMoreButton } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { Paragraph, Title } from '@/core/symbol/text';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { IArchiveFilter } from 'oftheday-shared';
import * as React from 'react';
import { FilterPresets } from './filter/filter-presets';

export interface ArchiveInitialProps {
	onClickPreset: (filter: IArchiveFilter) => void;
	onClickOverlayOpen: () => void;
}

export const ArchiveInitial: React.FC<ArchiveInitialProps> = (props) => {

	const { onClickPreset, onClickOverlayOpen } = props;

	const edgeSpacing = useResponsiveEdgeSpacing();

	return (
		<Spacing margin={edgeSpacing.horizontal}>
			<Title>Archive</Title>
			<Paragraph>
				Choose a preset below or create a filter.
			</Paragraph>
			<Paragraph>
				Notes, schedules, locations, and end-of-day thoughts are not accessible in the archive.
			</Paragraph>
			<ButtonsContainer>

				<FilterPresets
					onClickPreset={onClickPreset}
				/>
				<Paragraph textAlign='center' isMaxLineLength={false}>Or</Paragraph>
				<SeeMoreButton onClick={onClickOverlayOpen}>Create advanced filter</SeeMoreButton>
			</ButtonsContainer>
		</Spacing>
	);
};

const ButtonsContainer = tStyled.div`
	max-width: ${LayoutBreakpoint.mobileRegular}px;
	margin: ${spacing.large.value} auto;
`;