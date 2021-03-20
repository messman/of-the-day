import { Button } from '@/core/form/button/button';
import { Spacing, Block } from '@/core/layout/common';
import { OutLink } from '@/core/link';
import { tStyled } from '@/core/style/styled';
import { Heading1, Paragraph, RegularText } from '@/core/symbol/text';
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
			<>
				<Block.Dog16 />
				<RegularText>
					See the <OutLink href={meta.spotifyLink}>Spotify Playlist</OutLink>
				</RegularText>
			</>
		) : null;

		const youTubeLinkRender = meta.youTubeLink ? (
			<>
				<Block.Dog16 />
				<RegularText>
					See the <OutLink href={meta.youTubeLink}>YouTube Playlist</OutLink>
				</RegularText>
			</>
		) : null;

		metaPlaylistRender = (
			<TextCenter>
				<RegularText>Or</RegularText>
				<Block.Dog16 />
				{spotifyLinkRender}
				{youTubeLinkRender}
			</TextCenter>
		);
	}

	return (
		<ArchiveInitialContainer>
			<Heading1>Archive</Heading1>
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
				<Block.Dog16 />
				<TextCenter>
					<RegularText>Or</RegularText>
				</TextCenter>
				<Block.Dog16 />
				<Button onClick={onClickOverlayOpen} isSpecial={true}>Create advanced filter</Button>
				{metaPlaylistRender}
			</ButtonsContainer>
		</ArchiveInitialContainer>
	);
};

const ButtonsContainer = tStyled.div`
	max-width: ${LayoutBreakpointRem.c30}rem;
	margin: ${Spacing.elf24} auto;
`;

const TextCenter = tStyled.div`
	text-align: center;
`;

const ArchiveInitialContainer = tStyled.div`
	margin: 0 ${Spacing.dog16};
`;