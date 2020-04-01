import * as React from "react";
import * as Common from "@/styles/common";
import { RenderIf } from "@/unit/components/renderIf";

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
				<iframe src={youTubeEmbedLink} width="560" height="315" frameBorder="0" allow="encrypted-media" allowFullScreen></iframe>
			</Common.Bump>
		</>
	);
}