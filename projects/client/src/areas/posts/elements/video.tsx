import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { IPostElementType, IPostVideo, isValidPostElement } from 'oftheday-shared';
import { spacing, Spacing } from '@/core/layout/common';
import { RegularText, SmallText, Heading3 } from '@/core/symbol/text';
import { TagList, useTags } from './tag';
import { ActionLink } from '@/core/link';
import { SeeMoreButton, borderRadiusStyle } from '@/core/style/common';
import { Card } from '@/core/card/card';
import { iconTypes } from '@/core/symbol/icon';
import { createPostsElement } from './elements-common';

export const Video = createPostsElement<IPostVideo>((props) => {
	const { title, originalTitle, description, link, isTop, isNSFW, tags, isRemoved } = props.value;

	const tagsStrings = useTags(isTop, isNSFW, tags);

	let internalVideoRender: JSX.Element = null!;
	if (isRemoved) {
		internalVideoRender = (
			<RegularText isItalic={true}>Unfortunately, this video is no longer available.</RegularText>
		);
	}
	else {
		internalVideoRender = (
			<YouTubeVideoFrame url={link} />
		);
	}

	return (
		<Card title='Video' icon={iconTypes.video}>
			<Spacing margin={spacing.medium.bottom}>
				<VideoTitle title={title} originalTitle={originalTitle} />
			</Spacing>
			<TagList margin={spacing.medium.vertical} tags={tagsStrings} />
			<RegularText margin={spacing.medium.vertical} show={description}>
				{description}
			</RegularText>
			<Spacing margin={spacing.large.vertical}>
				{internalVideoRender}
			</Spacing>
			<SeeMoreButton>See All Video</SeeMoreButton>
		</Card>
	);
}, IPostElementType.video, isValidPostElement.video);

export interface VideoTitleProps {
	title: string;
	originalTitle: string;
}

const VideoTitle: React.FC<VideoTitleProps> = (props) => {
	const { title, originalTitle } = props;
	const [isShowingOriginalTitle, setIsShowingOriginalTitle] = React.useState(false);

	const differentOriginalTitle = title === originalTitle ? '' : originalTitle;

	let originalTitleWarningRender: JSX.Element | null = null;
	if (differentOriginalTitle && !isShowingOriginalTitle) {

		function onClick() {
			setIsShowingOriginalTitle(true);
		}

		originalTitleWarningRender = (
			<Spacing margin={spacing.nudge.top}>
				<SmallText>Title reworded by Andrew. <ActionLink onClick={onClick}>See original.</ActionLink></SmallText>
			</Spacing>
		);
	}

	const titleToShow = isShowingOriginalTitle ? differentOriginalTitle : title;

	return (
		<>
			<Heading3>{titleToShow}</Heading3>
			{originalTitleWarningRender}
		</>
	);
};

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
		${borderRadiusStyle};
	}
`;