// Handles the music component rendering.

import * as React from 'react';
import { IPostMusic } from 'oftheday-shared';
import { RegularText, Heading2 } from '@/core/symbol/text';
import { spacing, Spacing, LineMaxWidth } from '@/core/layout/common';
import { YouTubeVideoFrame } from './video';
import { TagList } from './tag';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { MusicQuote } from './quote/quote';
import { ElementRoot } from '../post';
import { SeeMoreButton } from '@/core/style/common';
import { MediaSplit } from '@/core/layout/media-split';

interface MusicProps {
	music: IPostMusic;
}

export const Music: React.FC<MusicProps> = (props) => {
	const { music } = props;

	const { title, artist, description, isTop, isNSFW, tags, spotifyLink, geniusLink, youTubeLink, useYouTube, quote, year } = music;

	const tagStrings = React.useMemo(() => {
		return ([isTop ? 'Top' : '', isNSFW ? 'NSFW' : '', ...tags]).filter(x => !!x);
	}, [tags, isTop, isNSFW]);

	// Required properties:
	if (!title || !artist || !spotifyLink || !geniusLink || !youTubeLink) {
		return null;
	}

	const yearSuffix = year ? <RegularText margin={spacing.nudge.top}>{year}</RegularText> : <></>;

	const titleRender = (
		<>
			<Heading2 margin={spacing.small.bottom}>Music</Heading2>
			<Spacing margin={spacing.large.bottom}>
				<Heading2 isItalic={true}>{title}</Heading2>
				<Heading2>{artist}</Heading2>
				{yearSuffix}
			</Spacing>
		</>
	);

	const splitRender = (
		<>
			<Spacing show={quote} margin={spacing.large.bottom}>
				<MusicQuote lyric={quote} />
			</Spacing>
			<SeeMoreButton>See All Music</SeeMoreButton>
		</>
	);

	const embedRender: JSX.Element = useYouTube ? <YouTubeVideoFrame url={youTubeLink} /> : <SpotifyEmbedFrame url={spotifyLink} />;



	return (
		<ElementRoot>
			<MediaSplit isLeft={true} titleRender={titleRender} mediaRender={embedRender} splitRender={splitRender}>
				<TagList margin={spacing.medium.bottom} tags={tagStrings} />
				<LineMaxWidth>
					<RegularText margin={spacing.medium.bottom} show={description}>
						{description}
					</RegularText>
				</LineMaxWidth>
				<MusicOutLinks music={music} />
			</MediaSplit>
		</ElementRoot>
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

const EmbedContainer = tStyled.div`
	iframe {
		width: 100%;
	}
`;

const MusicOutLinks: React.FC<MusicProps> = (props) => {
	const { spotifyLink, youTubeLink, geniusLink } = props.music;
	if (!spotifyLink || !youTubeLink || !geniusLink) {
		return null;
	}

	const linkSpacing = spacing.medium.right;

	return (
		<div>
			<RegularText isInline={true} margin={linkSpacing}>
				<OutLink href={spotifyLink}>Spotify</OutLink>
			</RegularText>
			<RegularText isInline={true} margin={linkSpacing}>
				<OutLink href={youTubeLink}>YouTube</OutLink>
			</RegularText>
			<RegularText isInline={true}>
				<OutLink href={geniusLink}>Lyrics</OutLink>
			</RegularText>
		</div>
	);
};