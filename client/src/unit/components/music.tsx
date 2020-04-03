import * as React from "react";
import * as Common from "@/styles/common";
import { If } from "@/unit/components/if";
import { MusicRecord } from "@/data/apiResponse";
import { Quote } from "@/tree/days/sections/quote";
import { OutLink } from "./link";
import { Video } from "./video";
import styled from "@/styles/theme";

interface MusicProps {
	record: MusicRecord
}

export const Music: React.FC<MusicProps> = (props) => {
	const { record } = props;

	if (!record) {
		return null;
	}

	let spotifyEmbedLink = null;
	if (record.spotifyLink) {
		spotifyEmbedLink = record.spotifyLink.replace("/track", "/embed/track");
	}

	return (
		<>
			<Common.Text>{record.artist} - "{record.title}"</Common.Text>

			<Common.Bump>
				<If show={!record.isYouTubePreferred}>
					{() =>
						<MusicContainer>
							<iframe src={spotifyEmbedLink} height="80" frameBorder="0" allow="encrypted-media"></iframe>
						</MusicContainer>
					}
				</If>
				<If show={record.isYouTubePreferred}>
					{() =>
						<Video link={record.youTubeLink} title={null} description={null} />
					}
				</If>
			</Common.Bump>

			<If show={record.quote}>
				{() =>
					<Common.Bump>
						<Quote text={record.quote} attribution={null} />
					</Common.Bump>
				}
			</If>

			<If show={record.description}>
				{() =>
					<Common.Bump>
						<Common.Text>{record.description}</Common.Text>
					</Common.Bump>
				}
			</If>

			<Common.Bump>
				<OutLink href={record.spotifyLink}>Spotify</OutLink>
				<Spacer />
				<OutLink href={record.youTubeLink}>YouTube</OutLink>
				<Spacer />
				<OutLink href={record.geniusLink}>Lyrics</OutLink>
			</Common.Bump>
		</>
	);
}

const MusicContainer = styled.div`
	iframe {
		width: 100%;
	}
`;

const Spacer = styled.span`
	display: inline-block;
	width: 2rem;
`;