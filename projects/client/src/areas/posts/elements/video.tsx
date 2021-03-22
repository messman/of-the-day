import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { IPostElementType, IPostVideo, isValidPostElement } from 'oftheday-shared';
import { Block } from '@/core/layout/common';
import { RegularText, SmallText, Heading3, FontSize, InlineWeight } from '@/core/symbol/text';
import { TagList, useTags } from './tag';
import { ActionLink } from '@/core/link';
import { iconTypes } from '@/core/symbol/icon';
import { createPostsElement, PostCard, EmbeddedContentReveal } from './elements-common';
import { CardPadding } from '@/core/card/card';
import { ElementActions } from '../element-action-overlay';
import { lineBreakpoint } from '@/services/layout/window-layout';

/**
 * Displays the video card. Shows title, description, tags, video iframe, etc.
 */
export const Video = createPostsElement<IPostVideo>((props) => {
	const { isForArchive, hideTitle, archivePost } = props;
	const { description, link, isTop, isNSFW, tags, isRemoved } = props.value;

	const tagsStrings = useTags(isTop, isNSFW, tags);

	let internalVideoRender: JSX.Element = null!;
	if (isRemoved) {
		internalVideoRender = (
			<RegularText>This video was removed from YouTube or made private.</RegularText>
		);
	}
	else {
		internalVideoRender = (
			<YouTubeVideoFrame url={link} />
		);
	}

	const descriptionRender = (description && !isRemoved) ? (
		<>
			<Block.Bat08 />
			<RegularTextMaxWidth>
				{description}
			</RegularTextMaxWidth>
		</>
	) : null;

	return (
		<PostCard title='Video' icon={iconTypes.video} isForArchive={isForArchive} hideTitle={hideTitle} archivePost={archivePost}>
			<CardPadding>
				<Block.Elf24 />
				<VideoTitle video={props.value} />
				<TagList tags={tagsStrings} />
				{descriptionRender}
				<Block.Elf24 />
				<ElementActions isViewingArchive={isForArchive} elementType={IPostElementType.video} isTop={isTop} youTubeLink={!isRemoved ? link : undefined} />
				<Block.Elf24 />
			</CardPadding>
			<Block.Elf24 />
			<EmbeddedContentReveal isRevealedOnMount={!isForArchive || isRemoved}>
				{internalVideoRender}
			</EmbeddedContentReveal>
		</PostCard>
	);
}, IPostElementType.video, isValidPostElement.video);

interface VideoTitleProps {
	video: IPostVideo;
}

const VideoTitle: React.FC<VideoTitleProps> = (props) => {
	const { video } = props;
	const { customTitle, customTitleCreator, originalTitle } = video;

	// Original title must be truthy - custom title information is optional.

	const [isShowingOriginalTitle, setIsShowingOriginalTitle] = React.useState(() => {
		// Show original title if we don't have a custom title.
		return !customTitle;
	});

	React.useEffect(() => {
		setIsShowingOriginalTitle(!video.customTitle);
	}, [video]);

	if (isShowingOriginalTitle) {
		return (
			<Heading3>{originalTitle}</Heading3>
		);
	}

	const isCustomTitleDifferent = customTitle !== originalTitle;

	function onClick() {
		setIsShowingOriginalTitle(true);
	}
	const originalTitleLink = isCustomTitleDifferent ? (
		<>
			<Block.Bat08 />
			<SmallText>Andrew customized this title. <SmallActionLink onClick={onClick}>See original.</SmallActionLink></SmallText>
		</>
	) : null;

	const customTitleCreatorRender = customTitleCreator ? (
		<Heading3><InlineWeight.Medium>from</InlineWeight.Medium> {customTitleCreator}</Heading3>
	) : null;

	return (
		<>
			<Heading3>{customTitle}</Heading3>
			{customTitleCreatorRender}
			{originalTitleLink}
		</>
	);
};

const SmallActionLink = tStyled(ActionLink)`
	font-size: ${FontSize.small};
`;

export interface YouTubeVideoFrameProps {
	url: string;
}

export const YouTubeVideoFrame: React.FC<YouTubeVideoFrameProps> = (props) => {
	const { url } = props;
	if (!url) {
		return null;
	}

	// Create an embed url.
	const embedUrl = url.replace('https://youtu.be/', 'https://www.youtube.com/embed/');

	return (
		<VideoContainer>
			<iframe src={embedUrl} frameBorder="0" allow="encrypted-media" allowFullScreen></iframe>
		</VideoContainer>
	);
};

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

const RegularTextMaxWidth = tStyled(RegularText)`
	max-width: ${lineBreakpoint};
`;