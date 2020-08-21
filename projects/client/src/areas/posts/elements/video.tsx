import * as React from 'react';
import { styled } from '@/core/style/styled';

export interface VideoProps {
	link: string;
	description: string | null;
	title: string | null;
}

export const Video: React.FC<VideoProps> = (props) => {
	const { link } = props;
	if (!link) {
		return null;
	}

	return (
		<>
			{/* <If show={title}>
				{() => <Text>"{title}"</Text>}
			</If>
			<If show={description}>
				{() => <Text>{description}</Text>}
			</If> */}
			<div>

			</div>
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