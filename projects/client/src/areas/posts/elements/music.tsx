// Handles the music component rendering.

import * as React from 'react';
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
import { IPost, IPostElementType, IPostMusic } from 'oftheday-shared';
import { createPostsElement } from './elements-common';

function shouldRenderMusic(post: IPost): boolean {
	const { music } = post;
	const { title, artist, spotifyLink, geniusLink, youTubeLink } = music;
	return !!title && !!artist && !!spotifyLink && !!geniusLink && !!youTubeLink;
}

export const Music = createPostsElement((props) => {
	const { post } = props;
	const { music } = post;

	const { title, artist, description, isTop, isNSFW, tags, spotifyLink, youTubeLink, useYouTube, quote, year } = music;

	const tagStrings = React.useMemo(() => {
		return ([isTop ? 'Top' : '', isNSFW ? 'NSFW' : '', ...tags]).filter(x => !!x);
	}, [tags, isTop, isNSFW]);

	if (!shouldRenderMusic(post)) {
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
}, IPostElementType.music, shouldRenderMusic);

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

interface MusicProps {
	music: IPostMusic;
}

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