// Handles the music component rendering.

import * as React from 'react';
import { IPostMusic } from 'oftheday-shared';
import { RegularText, Heading3 } from '@/core/symbol/text';
import { spacing, Spacing, } from '@/core/layout/common';
import { YouTubeVideoFrame } from './video';
import { TagList } from './tag';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { MusicQuote } from './quote/quote';
import { SeeMoreButton } from '@/core/style/common';
import { Card } from '@/core/card/card';
import { iconTypes } from '@/core/symbol/icon';

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

	const embedRender: JSX.Element = useYouTube ? <YouTubeVideoFrame url={youTubeLink} /> : <SpotifyEmbedFrame url={spotifyLink} />;

	return (
		<Card title='Music' icon={iconTypes.music}>
			<Spacing margin={spacing.medium.bottom}>
				<Heading3 isItalic={true}>{title}</Heading3>
				<Heading3>{artist}</Heading3>
				{yearSuffix}
			</Spacing>
			<TagList margin={spacing.medium.vertical} tags={tagStrings} />
			<RegularText margin={spacing.medium.vertical} show={description}>
				{description}
			</RegularText>
			<Spacing margin={spacing.medium.vertical}>

				<MusicOutLinks music={music} />
			</Spacing>
			<Spacing margin={spacing.large.vertical}>
				{embedRender}
			</Spacing>
			<Spacing show={quote} margin={spacing.large.vertical}>
				<MusicQuote lyric={quote} />
			</Spacing>
			<SeeMoreButton>See All Music</SeeMoreButton>
		</Card>
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