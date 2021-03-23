import { Button } from '@/core/form/button/button';
import { SimpleContentMaxWidthPadded } from '@/core/layout/common';
import { OutLink } from '@/core/link';
import { tStyled } from '@/core/style/styled';
import { Title, Paragraph, ParagraphCenter } from '@/core/symbol/text';
import { useMeta } from '@/services/data/data-context';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';
import { IArchiveFilter } from 'oftheday-shared';
import * as React from 'react';
import { FilterPresets } from './filter/filter-presets';

export interface ArchiveInitialProps {
	onClickPreset: (filter: IArchiveFilter) => void;
	onClickOverlayOpen: () => void;
}

/**
 * Component to show the initial view of the Archive page, before the user has chosen a filter / 
 * received archive data.
 */
export const ArchiveInitial: React.FC<ArchiveInitialProps> = (props) => {

	const { onClickPreset, onClickOverlayOpen } = props;

	const meta = useMeta();
	let metaPlaylistRender: JSX.Element | null = null;
	if (meta && (meta.spotifyLink || meta.youTubeLink)) {

		const spotifyLinkRender = meta.spotifyLink ? (
			<ParagraphCenter>
				See the <OutLink href={meta.spotifyLink}>Spotify Playlist</OutLink>
			</ParagraphCenter>
		) : null;

		const youTubeLinkRender = meta.youTubeLink ? (
			<ParagraphCenter>
				See the <OutLink href={meta.youTubeLink}>YouTube Playlist</OutLink>
			</ParagraphCenter>
		) : null;

		metaPlaylistRender = (
			<>
				<ParagraphCenter>Or</ParagraphCenter>
				{spotifyLinkRender}
				{youTubeLinkRender}
			</>
		);
	}

	return (
		<SimpleContentMaxWidthPadded>
			<Title>Archive</Title>
			<Paragraph>
				Choose a preset below or create a filter.
			</Paragraph>
			<Paragraph>
				Certain content (such as notes, schedules, locations, and thoughts) is not accessible in the archive.
			</Paragraph>
			<ButtonsContainer>
				<FilterPresets
					onClickPreset={onClickPreset}
				/>
				<ParagraphCenter>Or</ParagraphCenter>
				<Button onClick={onClickOverlayOpen} isSpecial={true}>Create advanced filter</Button>
				{metaPlaylistRender}
			</ButtonsContainer>
		</SimpleContentMaxWidthPadded>
	);
};

const ButtonsContainer = tStyled.div`
	max-width: ${LayoutBreakpointRem.c30}rem;
	margin: auto;
`;