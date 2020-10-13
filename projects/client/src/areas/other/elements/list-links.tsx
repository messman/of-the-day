import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { spacing, Spacing } from '@/core/layout/common';
import { OutLink } from '@/core/link';
import { Heading2 } from '@/core/symbol/text';
import { CardPadding } from '@/core/card/card';

export interface ListLinksProps {
	other: IOther;
}

export const ListLinks: React.FC<ListLinksProps> = (props) => {
	const { other } = props;
	const { spotifyLink, youTubeLink, imageAlbumLink, imageAlbumLinkText } = other;
	if (!spotifyLink && !youTubeLink && !imageAlbumLink && !imageAlbumLinkText) {
		return null;
	}

	const { horizontal } = spacing.medium;

	return (
		<Spacing margin={horizontal}>
			<CardPadding>
				<Heading2>Content Links</Heading2>
				<Spacing margin={spacing.nudge.top} show={spotifyLink}>
					<OutLink href={spotifyLink}>Spotify Playlist</OutLink> of all songs
			</Spacing>
				<Spacing margin={spacing.nudge.top} show={youTubeLink}>
					<OutLink href={youTubeLink}>YouTube Playlist</OutLink> of all videos
			</Spacing>
			</CardPadding>
		</Spacing>
	);
};
