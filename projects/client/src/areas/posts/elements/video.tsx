import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { IPostElementType } from 'oftheday-shared';
import { Block } from '@/core/layout/common';
import { SmallText, Paragraph, ParagraphArray } from '@/core/symbol/text';
import { TagList, useTags } from './tag';
import { iconTypes } from '@/core/symbol/icon';
import { EmbeddedContentReveal } from './elements-common';
import { ElementActions } from '../element-action-overlay';
import { CardTitle, CardTitleDistinctSpan, PostElementCard, PostElementProps } from '../card/card';

/**
 * Displays the video card. Shows title, description, tags, video iframe, etc.
 */
export const Video: React.FC<PostElementProps> = (props) => {
	const { isForArchive, isOfSameElement, post, isShowingEmbeddedByDefault } = props;
	const { description, link, isTop, isNSFW, tags, isRemoved, customTitle, customTitleCreator, originalTitle } = post.video!;

	const tagsStrings = useTags(isTop, isNSFW, tags);

	const isShowingCustom = customTitle && customTitle !== originalTitle;
	// Original title must be truthy - custom title information is optional.
	const originalTitleNotificationRender = isShowingCustom ? (
		<>
			<Block.Bat08 />
			<SmallText>Andrew customized this title.</SmallText>
		</>
	) : null;

	// We will show the 'from' even if there is no custom title.
	const customTitleCreatorRender = customTitleCreator ? (
		<CardTitle>
			<span>from </span>
			<CardTitleDistinctSpan>
				{customTitleCreator}
			</CardTitleDistinctSpan>
		</CardTitle>
	) : null;

	const titleToShow = isShowingCustom ? customTitle : originalTitle;

	let internalVideoRender: JSX.Element = null!;
	if (isRemoved) {
		internalVideoRender = (
			<Paragraph>Sorry! This video was removed from YouTube or made private.</Paragraph>
		);
	}
	else {
		internalVideoRender = (
			<YouTubeVideoFrame url={link} />
		);
	}

	const descriptionToRender = isRemoved ? [] : description;

	return (
		<PostElementCard
			title={titleToShow}
			icon={iconTypes.video}
			isForArchive={isForArchive}
			isOfSameElement={isOfSameElement}
			isShowingEmbeddedByDefault={true}
			post={post}
			actionsRender={
				<ElementActions
					isForArchive={isForArchive}
					elementType={IPostElementType.video}
					isTop={isTop}
					youTubeLink={!isRemoved ? link : undefined}
				/>
			}
		>
			{customTitleCreatorRender}
			{originalTitleNotificationRender}
			<Block.Dog16 />
			<TagList tags={tagsStrings} />
			<ParagraphArray value={descriptionToRender} />
			<Block.Dog16 />
			<EmbeddedContentReveal
				changeKey={link}
				isOnlyRevealedOnClick={!isShowingEmbeddedByDefault && !isRemoved}
				isUnloadedWhenHidden={!isRemoved}
				useElementForSize={false}
				useLargerMargin={false}
			>
				{internalVideoRender}
			</EmbeddedContentReveal>
		</PostElementCard>
	);
};

export interface YouTubeVideoFrameProps {
	url: string;
}

export const YouTubeVideoFrame: React.FC<YouTubeVideoFrameProps> = React.memo((props) => {
	const { url } = props;
	if (!url) {
		return null;
	}

	// Create an embed url.
	const embedUrl = url
		.replace('https://youtu.be/', 'https://www.youtube.com/embed/')
		.replace('?t=', '?start=');

	return (
		<VideoContainer>
			<iframe src={embedUrl} frameBorder="0" allow="encrypted-media" allowFullScreen></iframe>
		</VideoContainer>
	);
});

/* The padding-bottom creates our aspect ratio. */
export const VideoContainer = tStyled.div`
	position: relative;
	width: 100%;
	height: 0;
	padding-bottom: 56%;


	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		overflow: hidden;
	}
`;