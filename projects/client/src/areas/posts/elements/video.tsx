import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { IPostVideo } from 'oftheday-shared';
import { spacing, Spacing } from '@/core/layout/common';
import { Title, RegularText, SmallText, Subtitle } from '@/core/symbol/text';
import { TagList } from './tag';
import { ActionLink } from '@/core/link';
import { ElementRoot } from '../post';
import { SeeMoreButton, borderRadiusStyle, mediaBoxShadowStyle } from '@/core/style/common';
import { MediaSplit } from '@/core/layout/media-split';

export interface VideoProps {
	video: IPostVideo;
}

export const Video: React.FC<VideoProps> = (props) => {
	const { video } = props;
	const { title, originalTitle, description, link, isTop, isNSFW, tags, isRemoved } = video;

	// Required properties:
	if (!title || (!link && !isRemoved) || (!description && !isRemoved)) {
		return null;
	}

	const tagStrings = React.useMemo(() => {
		return ([isTop ? 'top' : '', isNSFW ? 'NSFW' : '', ...tags]).filter(x => !!x);
	}, [tags, isTop, isNSFW]);


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

	const titleRender = (
		<>
			<Subtitle margin={spacing.small.bottom}>Video</Subtitle>
			<Spacing margin={spacing.large.bottom}>
				<VideoTitle title={title} originalTitle={originalTitle} />
			</Spacing>
		</>
	);

	const splitRender = (
		<SeeMoreButton>See All Video</SeeMoreButton>
	);

	return (
		<ElementRoot>
			<MediaSplit isLeft={false} titleRender={titleRender} mediaRender={internalVideoRender} splitRender={splitRender}>
				<TagList margin={spacing.medium.bottom} tags={tagStrings} />
				<RegularText show={description}>
					{description}
				</RegularText>
			</MediaSplit>
		</ElementRoot>
	);
};

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
			<Title>{titleToShow}</Title>
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

	overflow: hidden;
	${borderRadiusStyle};
	${mediaBoxShadowStyle};

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`;