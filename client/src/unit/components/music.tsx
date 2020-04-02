import * as React from "react";
import * as Common from "@/styles/common";
import { TextPlaceholder } from "@/unit/components/placeholder";
import { RenderIf } from "@/unit/components/renderIf";
import { MusicRecord } from "@/data/apiResponse";
import { Quote } from "@/tree/days/sections/quote";
import { OutLink } from "./link";
import { PlaceholderRenderProperty } from "./placeholderRenderIf";
import { Video } from "./video";
import styled from "@/styles/theme";

interface MusicProps {
	isLoading: boolean
	record: MusicRecord
}

export const DayMusic: React.FC<MusicProps> = (props) => {
	const { isLoading, record } = props;
	if (!isLoading && !record) {
		return null;
	}

	return (
		<CommonMusic isLoading={isLoading} record={record} />
	);
}

interface ListMusicProps {
	record: MusicRecord
}

export const ListMusic: React.FC<ListMusicProps> = (props) => {
	const { record } = props;
	if (!record) {
		return null;
	}

	return (
		<>
			<Common.Title>
				<TextPlaceholder show={false} length={17}>
					{() => <>Day {record.dayNumber} - {record.dayAsText}</>}
				</TextPlaceholder>
			</Common.Title>

			<CommonMusic isLoading={false} record={record} />
		</>
	);
}

export const CommonMusic: React.FC<MusicProps> = (props) => {
	const { isLoading, record } = props;
	if (!isLoading && !record) {
		return null;
	}

	let spotifyEmbedLink = null;
	if (record && record.spotifyLink) {
		spotifyEmbedLink = record.spotifyLink.replace("/track", "/embed/track");
	}



	return (
		<>
			<Common.Text>
				<TextPlaceholder show={isLoading} length={16}>
					{() => <>{record.artist} - "{record.title}"</>}
				</TextPlaceholder>
			</Common.Text>

			<Common.Bump>
				<RenderIf show={!!record && !record.isYouTubePreferred}>
					{() =>
						<MusicContainer>
							<iframe src={spotifyEmbedLink} height="80" frameBorder="0" allow="encrypted-media"></iframe>
						</MusicContainer>
					}
				</RenderIf>
				<RenderIf show={!!record && record.isYouTubePreferred}>
					{() =>
						<Video isLoading={false} link={record.youTubeLink} title={null} description={null} />
					}
				</RenderIf>
			</Common.Bump>


			<RenderIf show={!!record && !!record.quote}>
				{() =>
					<Common.Bump>
						<Quote text={record.quote} attribution={null} />
					</Common.Bump>
				}
			</RenderIf>

			<Common.Bump>
				<PlaceholderRenderProperty
					isLoading={isLoading}
					title={null}
					titleLength={0}
					titleIcon={null}
					showIfProperty={() => record.description}
					propertyOutput={() => record.description}
					propertyLength={14}
				/>
			</Common.Bump>

			<RenderIf show={!!record}>
				{() =>
					<Common.Bump>
						<OutLink title="Spotify" url={record.spotifyLink} />
						<OutLink title="YouTube" url={record.youTubeLink} />
						<OutLink title="Genius Lyrics" url={record.geniusLink} />
					</Common.Bump>
				}
			</RenderIf>
		</>
	);
}

const MusicContainer = styled.div`
	iframe {
		width: 100%;
	}
`;