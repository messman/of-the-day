// Handles the music component rendering.

import * as React from 'react';
import { RegularText, Heading3, SmallText, InlineWeight } from '@/core/symbol/text';
import { LineMaxWidth, spacing, Spacing, TopMargin, } from '@/core/layout/common';
import { YouTubeVideoFrame } from './video';
import { TagList, useTags } from './tag';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { MusicQuote } from './quote/quote';
import { iconTypes } from '@/core/symbol/icon';
import { IPostElementType, IPostMusic, isValidPostElement } from 'oftheday-shared';
import { createPostsElement, PostCard, EmbeddedContentReveal } from './elements-common';
import { CardPadding } from '@/core/card/card';
import { ElementActions } from '../element-action-overlay';

/**
 * A Music card. Shows title, artist, year, YouTube video, tags, etc.
 */
export const Music = createPostsElement<IPostMusic>((props) => {
	const { isForArchive, hideTitle, archivePost } = props;
	const { title, artist, description, isTop, isNSFW, tags, spotifyLink, youTubeLink, useYouTube, geniusLink, quote, year } = props.value;

	const tagsStrings = useTags(isTop, isNSFW, tags);

	const embedRender: JSX.Element = useYouTube ? <YouTubeVideoFrame url={youTubeLink} /> : <SpotifyEmbedFrame url={spotifyLink} />;

	const yearRender = year ? (
		<TopMargin.Small>
			<SmallText>{year}</SmallText>
		</TopMargin.Small>
	) : null;

	const descriptionRender = description ? (
		<TopMargin.Small>
			<LineMaxWidth>
				<RegularText>{description}</RegularText>
			</LineMaxWidth>
		</TopMargin.Small>
	) : null;

	return (
		<PostCard title='Music' icon={iconTypes.music} isForArchive={isForArchive} hideTitle={hideTitle} archivePost={archivePost}>
			<CardPadding>
				<Spacing margin={spacing.large.bottom}>
					<Heading3>{title}</Heading3>
					<Heading3><InlineWeight.Medium>by</InlineWeight.Medium> {artist}</Heading3>
					{yearRender}
				</Spacing>
				<TagList margin={spacing.small.top} tags={tagsStrings} />
				{descriptionRender}
				<LinksContainer>
					<OutLink href={spotifyLink}>Spotify</OutLink>
					<OutLink href={youTubeLink}>YouTube</OutLink>
					<OutLink href={geniusLink}>Lyrics</OutLink>
					<ElementActions isViewingArchive={isForArchive} elementType={IPostElementType.music} isTop={isTop} spotifyLink={spotifyLink} youTubeLink={youTubeLink} />
				</LinksContainer>
			</CardPadding>
			<Spacing margin={spacing.large.top}>
				<EmbeddedContentReveal isRevealedOnMount={!isForArchive}>
					{embedRender}
				</EmbeddedContentReveal>
			</Spacing>
			<Spacing show={quote} margin={spacing.large.top}>
				<Spacing show={quote} margin={spacing.medium.value}>
					<MusicQuote lyric={quote} />
				</Spacing>
			</Spacing>
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

const LinksContainer = tStyled.div`
	a {
		margin-top: ${spacing.large.value};
		margin-right: ${spacing.medium.value};
	}
`;
