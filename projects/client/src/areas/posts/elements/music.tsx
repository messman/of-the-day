// Handles the music component rendering.

import * as React from 'react';
import { RegularText, Heading3 } from '@/core/symbol/text';
import { spacing, Spacing, } from '@/core/layout/common';
import { YouTubeVideoFrame } from './video';
import { TagList, useTags } from './tag';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { MusicQuote } from './quote/quote';
import { iconTypes } from '@/core/symbol/icon';
import { IPostElementType, IPostMusic, isValidPostElement } from 'oftheday-shared';
import { createPostsElement, PostArchiveLinks, PostCard, ShowEmbeddedContent } from './elements-common';
import { FontWeight } from '@/core/style/theme';
import { CardPadding } from '@/core/card/card';

export const Music = createPostsElement<IPostMusic>((props) => {
	const { isForArchive, archivePost } = props;
	const { title, artist, description, isTop, isNSFW, tags, spotifyLink, youTubeLink, useYouTube, quote, year } = props.value;

	const tagsStrings = useTags(isTop, isNSFW, tags);

	const embedRender: JSX.Element = useYouTube ? <YouTubeVideoFrame url={youTubeLink} /> : <SpotifyEmbedFrame url={spotifyLink} />;

	return (
		<PostCard title='Music' icon={iconTypes.music} isForArchive={isForArchive} archivePost={archivePost}>
			<CardPadding>
				<Spacing margin={spacing.large.bottom}>
					<Heading3>{title}</Heading3>
					<Heading3 fontWeight={FontWeight.medium}>by <InlineHeading3>{artist}</InlineHeading3></Heading3>
				</Spacing>
				<RegularText show={year}>{year}</RegularText>
				<TagList margin={spacing.small.vertical} tags={tagsStrings} />
				<RegularText margin={spacing.small.vertical} show={description}>
					{description}
				</RegularText>
				<Spacing margin={spacing.small.vertical}>
					<MusicOutLinks music={props.value} />
				</Spacing>
			</CardPadding>
			<Spacing margin={spacing.large.top}>
				<ShowEmbeddedContent isForArchive={isForArchive}>
					{embedRender}
				</ShowEmbeddedContent>
			</Spacing>
			<CardPadding>
				<Spacing show={quote} margin={spacing.large.top}>
					<MusicQuote lyric={quote} />
				</Spacing>
				<PostArchiveLinks isForArchive={!!isForArchive} isMusic={true} isTop={isTop} />
			</CardPadding>
		</PostCard>
	);
}, IPostElementType.music, isValidPostElement.music);

const InlineHeading3 = tStyled(Heading3)`
	display: inline;
`;

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