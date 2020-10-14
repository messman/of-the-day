import { Button } from '@/core/form/button/button';
import { Spacing, spacing, TextCenter, TopMargin, useResponsiveEdgeSpacing } from '@/core/layout/common';
import { OutLink } from '@/core/link';
import { tStyled } from '@/core/style/styled';
import { Heading1, Paragraph, RegularText } from '@/core/symbol/text';
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
			<TopMargin.Medium>
				<RegularText>
					See the <OutLink href={meta.spotifyLink}>Spotify Playlist</OutLink>
				</RegularText>
			</TopMargin.Medium>
		) : null;

		const youTubeLinkRender = meta.youTubeLink ? (
			<TopMargin.Medium>
				<RegularText>
					See the <OutLink href={meta.youTubeLink}>YouTube Playlist</OutLink>
				</RegularText>
			</TopMargin.Medium>
		) : null;

		metaPlaylistRender = (
			<TextCenter>
				<TopMargin.Medium>
					<RegularText>Or</RegularText>
				</TopMargin.Medium>
				{spotifyLinkRender}
				{youTubeLinkRender}
			</TextCenter>
		);
	}

	return (
		<Spacing margin={edgeSpacing.horizontal}>
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
				<TextCenter>
					<TopMargin.Medium>
						<RegularText>Or</RegularText>
					</TopMargin.Medium>
				</TextCenter>
				<TopMargin.Medium>
					<Button onClick={onClickOverlayOpen} isSpecial={true}>Create advanced filter</Button>
				</TopMargin.Medium>
				{metaPlaylistRender}
			</ButtonsContainer>
		</Spacing>
	);
};

const ButtonsContainer = tStyled.div`
	max-width: ${LayoutBreakpoint.mobileRegular}px;
	margin: ${spacing.large.value} auto;
`;