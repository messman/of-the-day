import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { IPostElementType, IPostVideo, isValidPostElement } from 'oftheday-shared';
import { spacing, Spacing } from '@/core/layout/common';
import { RegularText, SmallText, Heading3 } from '@/core/symbol/text';
import { TagList, useTags } from './tag';
import { ActionLink } from '@/core/link';
import { iconTypes } from '@/core/symbol/icon';
import { createPostsElement, PostArchiveLinks, PostCard, ShowEmbeddedContent } from './elements-common';
import { CardPadding } from '@/core/card/card';
import { FontWeight } from '@/core/style/theme';

export const Video = createPostsElement<IPostVideo>((props) => {
	const { isForArchive, archivePost } = props;
	const { description, link, isTop, isNSFW, tags, isRemoved } = props.value;

	const tagsStrings = useTags(isTop, isNSFW, tags);

	let internalVideoRender: JSX.Element = null!;
	if (isRemoved) {
		internalVideoRender = (
			<RegularText isItalic={true}>Unfortunately, this video is no longer available on YouTube.</RegularText>
		);
	}
	else {
		internalVideoRender = (
			<YouTubeVideoFrame url={link} />
		);
	}

	return (
		<PostCard title='Video' icon={iconTypes.video} isForArchive={isForArchive} archivePost={archivePost}>
			<CardPadding>
				<Spacing margin={spacing.large.bottom}>
					<VideoTitle video={props.value} />
				</Spacing>
				<TagList margin={spacing.small.vertical} tags={tagsStrings} />
				<RegularText margin={spacing.small.vertical} show={description && !isRemoved}>
					{description}
				</RegularText>
			</CardPadding>
			<Spacing margin={spacing.large.top}>
				<ShowEmbeddedContent isForArchive={isForArchive && !isRemoved}>
					{internalVideoRender}
				</ShowEmbeddedContent>
			</Spacing>
			<CardPadding>
				<PostArchiveLinks isForArchive={!!isForArchive} isVideo={true} isTop={isTop} />
			</CardPadding>
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
		setIsShowingOriginalTitle(false);
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
		<Spacing margin={spacing.nudge.top}>
			<SmallText>Andrew customized this title. <ActionLink onClick={onClick}>See original.</ActionLink></SmallText>
		</Spacing>
	) : null;

	return (
		<>
			<Heading3>{customTitle}</Heading3>
			<Heading3 show={customTitleCreator} fontWeight={FontWeight.medium}>from <InlineBold>{customTitleCreator}</InlineBold></Heading3>
			{originalTitleLink}
		</>
	);
};

const InlineBold = tStyled.span`
	display: inline;
	font-weight: ${FontWeight.bold};
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
const VideoContainer = tStyled.div`
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