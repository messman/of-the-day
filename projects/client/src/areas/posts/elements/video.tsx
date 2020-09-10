import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { IPostVideo } from 'oftheday-shared';
import { spacing, Spacing } from '@/core/layout/common';
import { RegularText, SubText } from '@/core/symbol/text';
import { TagList } from './tag';
import { ActionLink } from '@/core/link';
import { ElementRoot } from '../post';

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

	const { horizontal, vertical } = spacing.medium;


	let internalVideoRender: JSX.Element = null!;
	if (isRemoved) {
		internalVideoRender = (
			<RegularText isItalic={true} margin={vertical}>Video removed.</RegularText>
		);
	}
	else {
		internalVideoRender = (
			<>
				<Spacing margin={vertical}>
					<YouTubeVideoFrame url={link} />
				</Spacing>

				<RegularText margin={vertical}>{description}</RegularText>
			</>
		);
	}
	return (
		<ElementRoot>
			<Spacing margin={horizontal}>
				<VideoTitle title={title} originalTitle={originalTitle} />

				<Spacing margin={vertical}>
					<TagList tags={tagStrings} />
				</Spacing>
				{internalVideoRender}
			</Spacing>
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
				<NoteText>Title reworded by Andrew. <ActionLink onClick={onClick}>See original.</ActionLink></NoteText>
			</Spacing>
		);
	}

	const titleToShow = isShowingOriginalTitle ? differentOriginalTitle : title;

	return (
		<>
			<RegularText>{titleToShow}</RegularText>
			{originalTitleWarningRender}
		</>
	);
};

const NoteText = tStyled(SubText)`
	font-style: italic;
	opacity: .8;
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
	}
`;