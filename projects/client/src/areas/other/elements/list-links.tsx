import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { LabelValue, Value, DynamicMargin } from '@/core/layout/common';
import { largerSpacing, lineSpacing } from '@/core/style/common';
import { OutLink } from '@/core/link';

export interface ListLinksProps {
	other: IOther;
}

export const ListLinks: React.FC<ListLinksProps> = (props) => {
	const { other } = props;
	const { spotifyLink, youTubeLink, imageAlbumLink, imageAlbumLinkText } = other;
	if (!spotifyLink && !youTubeLink && !imageAlbumLink && !imageAlbumLinkText) {
		return null;
	}

	const { horizontal, vertical } = largerSpacing;

	return (
		<DynamicMargin margin={horizontal}>
			<LabelValue margin={vertical} label='Content Links'>
				<Value margin={lineSpacing.top} show={spotifyLink}>
					<OutLink href={spotifyLink}>Spotify Playlist</OutLink> of all songs
				</Value>
				<Value margin={lineSpacing.top} show={youTubeLink}>
					<OutLink href={youTubeLink}>YouTube Playlist</OutLink> of all videos
				</Value>
			</LabelValue>
		</DynamicMargin>
	);
};
