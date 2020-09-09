// Handles the music component rendering.

import * as React from 'react';
import { IPostMusic } from 'oftheday-shared';
import { Text } from '@/core/symbol/text';
import { LabelValue, Value, DynamicMargin } from '@/core/layout/common';
import { spacing } from '@/core/style/common';
import { YouTubeVideoFrame } from './video';
import { TagList } from './tag';
import { styled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { FlexRow } from '@messman/react-common';
import { MusicQuote } from './quote';
import { ElementRoot } from '../post';
import { useIsCompactWidth } from '@/services/layout/window-layout';

interface MusicProps {
	music: IPostMusic;
}

export const Music: React.FC<MusicProps> = (props) => {
	const { music } = props;

	const { title, artist, description, isTop, isNSFW, tags, spotifyLink, geniusLink, youTubeLink, useYouTube, quote } = music;
	// Required properties:
	if (!title || !artist || !spotifyLink || !geniusLink || !youTubeLink) {
		return null;
	}

	const tagStrings = React.useMemo(() => {
		return ([isTop ? 'top' : '', isNSFW ? 'NSFW' : '', ...tags]).filter(x => !!x);
	}, [tags, isTop, isNSFW]);

	const embedRender: JSX.Element = useYouTube ? <YouTubeVideoFrame url={youTubeLink} /> : <SpotifyEmbedFrame url={spotifyLink} />;

	const { horizontal, vertical } = spacing.medium;

	return (
		<ElementRoot>
			<DynamicMargin margin={horizontal}>
				<LabelValue margin={vertical} label='Song'>
					<MusicTitle music={music} />
				</LabelValue>

				<DynamicMargin margin={vertical}>
					<TagList tags={tagStrings} />
				</DynamicMargin>
				<DynamicMargin margin={vertical}>
					{embedRender}
				</DynamicMargin>

				<Value margin={vertical}>{description}</Value>

				<DynamicMargin margin={vertical}>
					<MusicOutLinks music={music} />
				</DynamicMargin>

				<DynamicMargin margin={vertical}>
					<MusicQuote lyric={quote} />
				</DynamicMargin>

			</DynamicMargin>
		</ElementRoot>
	);
};

const MusicTitle: React.FC<MusicProps> = (props) => {
	const isCompactWidth = useIsCompactWidth();
	const { music } = props;
	// Year is optional, others are required.
	const { title, artist, year } = music;

	if (!isCompactWidth) {
		const compactYearSuffix = year ? ` (${year})` : '';
		return <Text><em>{title}</em>, by {artist}{compactYearSuffix}</Text>;
	}

	const yearSuffix = year ? <Text>{year}</Text> : <></>;

	return (
		<>
			<Text><em>{title}</em></Text>
			<Text>{artist}</Text>
			{yearSuffix}
		</>
	);
};

interface SpotifyEmbedFrameProps {
	url: string;
}

const SpotifyEmbedFrame: React.FC<SpotifyEmbedFrameProps> = (props) => {
	const { url } = props;
	if (!url) {
		return null;
	}

	// Create an embed url.
	const embedUrl = url.replace('/track', '/embed/track');

	return (
		<EmbedContainer>
			<iframe src={embedUrl} height="80" frameBorder="0" allow="encrypted-media"></iframe>
		</EmbedContainer>
	);
};

const EmbedContainer = styled.div`
	iframe {
		width: 100%;
	}
`;

const MusicOutLinks: React.FC<MusicProps> = (props) => {
	const isCompactWidth = useIsCompactWidth();
	const { spotifyLink, youTubeLink, geniusLink } = props.music;
	if (!spotifyLink || !youTubeLink || !geniusLink) {
		return null;
	}


	if (isCompactWidth) {
		return (
			<Text>
				<FlexRow justifyContent='space-around'>
					<OutLink href={spotifyLink}>Spotify</OutLink>
					<OutLink href={youTubeLink}>YouTube</OutLink>
					<OutLink href={geniusLink}>Lyrics</OutLink>
				</FlexRow>
			</Text>
		);
	}

	return (
		<Text>
			<div>
				<OutLink href={spotifyLink}>Listen on Spotify</OutLink>
				<Spacer />
				<OutLink href={youTubeLink}>Watch on YouTube</OutLink>
				<Spacer />
				<OutLink href={geniusLink}>See the Lyrics</OutLink>
			</div>
		</Text>
	);
};

const Spacer = styled.span`
	display: inline-block;
	width: calc(${spacing.small.value} * 2);
`;