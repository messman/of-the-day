// Handles the music component rendering.

import * as React from 'react';
import { Paragraph, SmallText } from '@/core/symbol/text';
import { Block, Spacing, } from '@/core/layout/common';
import { YouTubeVideoFrame } from './video';
import { TagList, useTags } from './tag';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { MusicQuote } from './quote/quote';
import { iconTypes } from '@/core/symbol/icon';
import { EmbeddedContentReveal } from './elements-common';
import { ElementActions } from '../element-action-overlay';
import { CardTitle, CardTitleDistinctSpan, PostElementCard, PostElementProps } from '../card/card';
import { IPostElementType } from 'oftheday-shared';

/**
 * A Music card. Shows title, artist, year, YouTube video, tags, etc.
 */
export const Music: React.FC<PostElementProps> = (props) => {
	const { isForArchive, isOfSameElement, post } = props;
	const { title, artist, description, isTop, isNSFW, tags, spotifyLink, youTubeLink, useYouTube, geniusLink, quote, year } = post.music!;

	const tagsStrings = useTags(isTop, isNSFW, tags);

	const embedRender: JSX.Element = useYouTube ? <YouTubeVideoFrame url={youTubeLink} /> : <SpotifyEmbedFrame url={spotifyLink} />;

	const yearRender = year ? (
		<>
			<Block.Bat08 />
			<SmallText>{year}</SmallText>
		</>
	) : null;

	const descriptionRender = description ? (
		<>
			<Block.Bat08 />
			<Paragraph>{description}</Paragraph>
		</>
	) : null;

	const musicRender = quote ? (
		<>
			<Block.Dog16 />
			<MusicQuote lyric={quote} />
		</>
	) : null;

	return (
		<PostElementCard
			title={title}
			icon={iconTypes.music}
			isForArchive={isForArchive}
			isOfSameElement={isOfSameElement}
			post={post}
			actionsRender={
				<ElementActions
					isViewingArchive={isForArchive}
					elementType={IPostElementType.music}
					isTop={isTop}
					spotifyLink={spotifyLink}
					youTubeLink={youTubeLink}
				/>
			}
		>
			<CardTitle>
				<span>by </span>
				<CardTitleDistinctSpan>{artist}</CardTitleDistinctSpan>
			</CardTitle>
			{yearRender}
			<Block.Dog16 />
			<TagList tags={tagsStrings} />
			{descriptionRender}
			<LinksContainer>
				<OutLink href={spotifyLink}>Listen on Spotify</OutLink>
				<OutLink href={geniusLink}>View Lyrics</OutLink>
			</LinksContainer>
			<Block.Dog16 />
			<EmbeddedContentReveal isRevealedOnMount={!isForArchive}>
				{embedRender}
			</EmbeddedContentReveal>
			{musicRender}
		</PostElementCard>
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

const LinksContainer = tStyled.div`
	a {
		margin-top: ${Spacing.elf24};
		margin-right: ${Spacing.dog16};
	}
`;