import * as React from 'react';
import { styled } from '@/core/style/styled';
import { IPostVideo } from 'oftheday-shared';
import { largerSpacing } from '@/core/style/common';
import { LabelValue, DynamicMargin, Value } from '@/core/layout/common';
import { Text, SubText } from '@/core/symbol/text';
import { TagList } from './tag';
import { ElementSeparator } from './separators';
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

	const { horizontal: largerSpacingHorizontal, vertical: largerSpacingVertical } = largerSpacing;


	let internalVideoRender: JSX.Element = null!;
	if (isRemoved) {
		internalVideoRender = (
			<Value margin={largerSpacingVertical}><em>Video removed.</em></Value>
		);
	}
	else {
		internalVideoRender = (
			<>
				<DynamicMargin margin={largerSpacingVertical}>
					<YouTubeVideoFrame url={link} />
				</DynamicMargin>

				<Value margin={largerSpacingVertical}>{description}</Value>
			</>
		);
	}
	return (
		<ElementRoot>
			<DynamicMargin margin={largerSpacingHorizontal}>
				<LabelValue margin={largerSpacingVertical} label='Video'>
					<VideoTitle title={title} originalTitle={originalTitle} />
				</LabelValue>

				<DynamicMargin margin={largerSpacingVertical}>
					<TagList tags={tagStrings} />
				</DynamicMargin>
				{internalVideoRender}
				<ElementSeparator />
			</DynamicMargin>
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
			<DynamicMargin margin='3px 0 0 0'>
				<NoteText>Title reworded by Andrew. <ActionLink onClick={onClick}>See original.</ActionLink></NoteText>
			</DynamicMargin>
		);
	}

	const titleToShow = isShowingOriginalTitle ? differentOriginalTitle : title;

	return (
		<>
			<Text>{titleToShow}</Text>
			{originalTitleWarningRender}
		</>
	);
};

const NoteText = styled(SubText)`
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
const VideoContainer = styled.div`
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