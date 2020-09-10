import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { spacing, Spacing } from '@/core/layout/common';
import { OutLink } from '@/core/link';
import { Subtitle } from '@/core/symbol/text';

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
			<Subtitle>Content Links</Subtitle>
			<Spacing margin={spacing.nudge.top} show={spotifyLink}>
				<OutLink href={spotifyLink}>Spotify Playlist</OutLink> of all songs
			</Spacing>
			<Spacing margin={spacing.nudge.top} show={youTubeLink}>
				<OutLink href={youTubeLink}>YouTube Playlist</OutLink> of all videos
			</Spacing>
		</Spacing>
	);
};
