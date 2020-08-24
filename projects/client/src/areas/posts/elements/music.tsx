// Handles the music component rendering.

import * as React from 'react';
import { IPostMusic } from 'oftheday-shared';
import { Text } from '@/core/symbol/text';
import { LabelValue, Value, DynamicMargin } from '@/core/layout/common';
import { largerSpacing, smallerSpacingValue } from '@/core/style/common';
import { ElementSeparator } from './separators';
import { YouTubeVideoFrame } from './video';
import { TagList } from './tag';
import { styled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { FlexRow, useWindowLayout, DefaultLayoutBreakpoint } from '@messman/react-common';
import { MusicQuote } from './quote';

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

	const { horizontal: largerSpacingHorizontal, vertical: largerSpacingVertical } = largerSpacing;

	return (
		<DynamicMargin margin={largerSpacingHorizontal}>
			<LabelValue margin={largerSpacingVertical} label='Song'>
				<MusicTitle music={music} />
			</LabelValue>

			<DynamicMargin margin={largerSpacingVertical}>
				<TagList tags={tagStrings} />
			</DynamicMargin>
			<DynamicMargin margin={largerSpacingVertical}>
				{embedRender}
			</DynamicMargin>

			<Value margin={largerSpacingVertical}>{description}</Value>

			<DynamicMargin margin={largerSpacingVertical}>
				<MusicOutLinks music={music} />
			</DynamicMargin>

			<DynamicMargin margin={largerSpacingVertical}>
				<MusicQuote lyric={quote} />
			</DynamicMargin>


			<ElementSeparator />
		</DynamicMargin>
	);
};

const MusicTitle: React.FC<MusicProps> = (props) => {
	const windowLayout = useWindowLayout();
	const { music } = props;
	// Year is optional, others are required.
	const { title, artist, year } = music;

	const isCompact = windowLayout.widthBreakpoint < DefaultLayoutBreakpoint.regular;
	if (!isCompact) {
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
	const windowLayout = useWindowLayout();
	const { spotifyLink, youTubeLink, geniusLink } = props.music;
	if (!spotifyLink || !youTubeLink || !geniusLink) {
		return null;
	}

	const isCompact = windowLayout.widthBreakpoint < DefaultLayoutBreakpoint.regular;

	if (isCompact) {
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
	width: calc(${smallerSpacingValue} * 2);
`;