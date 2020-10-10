// Handles the music component rendering.

import * as React from 'react';
import { RegularText, Heading3 } from '@/core/symbol/text';
import { spacing, Spacing, } from '@/core/layout/common';
import { YouTubeVideoFrame } from './video';
import { TagList, useTags } from './tag';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { MusicQuote } from './quote/quote';
import { SeeMoreButton } from '@/core/style/common';
import { iconTypes } from '@/core/symbol/icon';
import { IPostElementType, IPostMusic, isValidPostElement } from 'oftheday-shared';
import { createPostsElement, PostCard } from './elements-common';

export const Music = createPostsElement<IPostMusic>((props) => {
	const { isForArchive, archivePost } = props;
	const { title, artist, description, isTop, isNSFW, tags, spotifyLink, youTubeLink, useYouTube, quote, year } = props.value;

	const tagsStrings = useTags(isTop, isNSFW, tags);

	const yearSuffix = year ? <RegularText margin={spacing.nudge.top}>{year}</RegularText> : <></>;

	const embedRender: JSX.Element = useYouTube ? <YouTubeVideoFrame url={youTubeLink} /> : <SpotifyEmbedFrame url={spotifyLink} />;

	return (
		<PostCard title='Music' icon={iconTypes.music} isForArchive={isForArchive} archivePost={archivePost}>
			<Spacing margin={spacing.medium.bottom}>
				<Heading3 isItalic={true}>{title}</Heading3>
				<Heading3>{artist}</Heading3>
				{yearSuffix}
			</Spacing>
			<TagList margin={spacing.medium.vertical} tags={tagsStrings} />
			<RegularText margin={spacing.medium.vertical} show={description}>
				{description}
			</RegularText>
			<Spacing margin={spacing.medium.vertical}>
				<MusicOutLinks music={props.value} />
			</Spacing>
			<Spacing margin={spacing.large.vertical}>
				{embedRender}
			</Spacing>
			<Spacing show={quote} margin={spacing.large.vertical}>
				<MusicQuote lyric={quote} />
			</Spacing>
			<SeeMoreButton>See All Music</SeeMoreButton>
		</PostCard>
	);
}, IPostElementType.music, isValidPostElement.music);

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