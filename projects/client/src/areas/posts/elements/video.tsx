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

	// Requires us to get our YouTube link in a special way from the 'share' button rather than the URL.
	const youTubeEmbedLink = link.replace('https://youtu.be/', 'https://www.youtube.com/embed/');

	return (
		<>
			{/* <If show={title}>
				{() => <Text>"{title}"</Text>}
			</If>
			<If show={description}>
				{() => <Text>{description}</Text>}
			</If> */}
			<div>
				<VideoContainer>
					<iframe src={youTubeEmbedLink} frameBorder="0" allow="encrypted-media" allowFullScreen></iframe>
				</VideoContainer>
			</div>
		</>
	);
};

const VideoContainer = styled.div`
	position: relative;
	width: 100%;
	height: 0;
	/* Creates our aspect ratio. */
	padding-bottom: 56%;

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`;