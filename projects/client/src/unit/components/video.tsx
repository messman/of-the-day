import * as React from "react";
import * as Common from "@/styles/common";
import { If } from "@/unit/components/if";
import styled from "@/styles/theme";

interface VideoProps {
	link: string,
	description: string,
	title: string
}

export const Video: React.FC<VideoProps> = (props) => {
	const { link, description, title } = props;
	if (!link) {
		return null;
	}

	// Requires us to get our YouTube link in a special way from the "share" button rather than the URL.
	let youTubeEmbedLink = null;
	if (link) {
		youTubeEmbedLink = link.replace("https://youtu.be/", "https://www.youtube.com/embed/");
	}

	return (
		<>
			<If show={title}>
				{() => <Common.Text>"{title}"</Common.Text>}
			</If>
			<If show={description}>
				{() => <Common.Text>{description}</Common.Text>}
			</If>
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