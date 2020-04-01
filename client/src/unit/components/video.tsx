import * as React from "react";
import * as Common from "@/styles/common";
import { RenderIf } from "@/unit/components/renderIf";
import styled from "@/styles/theme";

interface VideoProps {
	isLoading: boolean,
	link: string,
	description: string,
	title: string
}

export const Video: React.FC<VideoProps> = (props) => {
	const { isLoading, link, description, title } = props;
	if (isLoading || !link) {
		return null;
	}

	let youTubeEmbedLink = null;
	if (link) {
		youTubeEmbedLink = link.replace("https://youtu.be/", "https://www.youtube.com/embed/");
	}

	return (
		<>
			<RenderIf show={!!title}>
				{() => <Common.Text>"{title}"</Common.Text>}
			</RenderIf>
			<RenderIf show={!!description}>
				{() => <Common.Text>{description}</Common.Text>}
			</RenderIf>
			<Common.Bump>
				<VideoContainer>
					<iframe src={youTubeEmbedLink} frameBorder="0" allow="encrypted-media" allowFullScreen></iframe>
				</VideoContainer>
			</Common.Bump>
		</>
	);
}

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