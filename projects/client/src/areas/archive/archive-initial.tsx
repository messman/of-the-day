import { Button } from '@/core/form/button/button';
import { Spacing, spacing, useResponsiveEdgeSpacing } from '@/core/layout/common';
import { OutLink } from '@/core/link';
import { tStyled } from '@/core/style/styled';
import { Paragraph, Title } from '@/core/symbol/text';
import { useMeta } from '@/services/data/data-context';
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

	const meta = useMeta();
	let metaPlaylistRender: JSX.Element | null = null;
	if (meta && (meta.spotifyLink || meta.youTubeLink)) {

		const spotifyLinkRender = meta.spotifyLink ? (
			<Paragraph textAlign='center' isMaxLineLength={false}>
				See the <OutLink href={meta.spotifyLink}>Spotify Playlist</OutLink>
			</Paragraph>
		) : null;

		const youTubeLinkRender = meta.youTubeLink ? (
			<Paragraph textAlign='center' isMaxLineLength={false}>
				See the <OutLink href={meta.youTubeLink}>YouTube Playlist</OutLink>
			</Paragraph>
		) : null;

		metaPlaylistRender = (
			<div>
				<Paragraph textAlign='center' isMaxLineLength={false}>Or</Paragraph>
				{spotifyLinkRender}
				{youTubeLinkRender}
			</div>
		);
	}

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
				<Button onClick={onClickOverlayOpen} isSpecial={true}>Create advanced filter</Button>
				{metaPlaylistRender}
			</ButtonsContainer>
		</Spacing>
	);
};

const ButtonsContainer = tStyled.div`
	max-width: ${LayoutBreakpoint.mobileRegular}px;
	margin: ${spacing.large.value} auto;
`;